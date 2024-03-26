//
//  UserModel.swift
//  Homework3
//
//  Created by Sam King on 1/11/24.
//

import Foundation
import SwiftUI

struct Response: Decodable {
    let data: Data?
}

struct Data: Decodable {
    let generateKeys: GenerateKeys
}

struct GenerateKeys: Decodable {
    let publicKey: String
    let privateKey: String
}


@MainActor class UserModel: ObservableObject {
    // Authentication token and current user information
    @Published var authToken: String?
    @Published var currentUser: User?
    @Published var privateKey: String?
    @Published var publicKey: String?
    
    let missingAuthToken = ApiError(errorCode: "missing_auth_token_error", message: "Auth token is not set")
    let invalidAmount = ApiError(errorCode: "invalid_amount_error", message: "Invalid amount")
    
    init() {
        self.publicKey = UserDefaults.standard.string(forKey: "publicKey")
        self.privateKey = UserDefaults.standard.string(forKey: "privateKey")
    }
    
    // Registration of a user
    func generateKeys(completion: @escaping (String?, String?, String?) -> Void) {
        let parameters = "{\"query\":\"mutation GenerateKeys {\\n    generateKeys {\\n        publicKey\\n        privateKey\\n    }\\n}\\n\",\"variables\":{}}"
        guard let postData = parameters.data(using: .utf8) else {
            completion(nil, nil, "Failed to encode request parameters")
            return
        }

        var request = URLRequest(url: URL(string: "https://cloud.resilientdb.com/graphql")!,timeoutInterval: Double.infinity)
        request.addValue("application/json", forHTTPHeaderField: "Content-Type")

        request.httpMethod = "POST"
        request.httpBody = postData

        URLSession.shared.dataTask(with: request) { data, response, error in
            guard let data = data else {
                completion(nil, nil, error?.localizedDescription ?? "Unknown error")
                return
            }

            do {
                let result = try JSONDecoder().decode(Response.self, from: data)
                let publicKey = result.data?.generateKeys.publicKey
                let privateKey = result.data?.generateKeys.privateKey
                completion(publicKey, privateKey, nil)

            } catch {
                completion(nil, nil, "Failed to decode response")
            }
        }.resume()
    }
    
    func saveKeys(privateKey : String , publicKey: String) {
        saveAuthToken(privateKey: privateKey, publicKey: publicKey)
    }
    
    func logout() {
        UserDefaults.standard.removeObject(forKey: "privateKey")
        UserDefaults.standard.removeObject(forKey: "publicKey")
        UserDefaults.standard.synchronize()
    }
    
    // NOTE: we need to tell them about UserDefaults.standard and synchronize
    private func saveAuthToken(privateKey: String , publicKey: String) {
        UserDefaults.standard.setValue(privateKey, forKey: "privateKey")
        UserDefaults.standard.setValue(publicKey, forKey: "publicKey")
        UserDefaults.standard.synchronize()
    }
    
    // ITS YOUR BOY THE G.O.A.T, THE MYTH, THE LEGEND, AND THE CHAMPION ROOOOOOHANNNNNN
    // Function to deposit an amount into an account
    func deposit(accountId: String, amountInCents: Int) async throws {
        guard let authToken = self.authToken else { throw ApiError.urlError }
        
        do {
            let response = try await Api.shared.deposit(authToken: authToken, account: Account(name: "", id: accountId, balance: 0), amountInCents: amountInCents)
            
            // Assuming the deposit API call returns the updated user information
            DispatchQueue.main.async {
                self.currentUser = response.user
            }
        } catch {
            throw error // Propagate errors to be handled by the caller
        }
        print(self.currentUser ?? "")
    }
    
    // Function to withdraw an amount into an account
    func withdraw(accountId: String, amountInCents: Int) async throws {
        guard let authToken = self.authToken else { throw ApiError.urlError }
        
        do {
            let response = try await Api.shared.withdraw(authToken: authToken, account: Account(name: "", id: accountId, balance: 0), amountInCents: amountInCents)
            
            // Assuming the withdraw API call returns the updated user information
            DispatchQueue.main.async {
                self.currentUser = response.user
            }
        } catch {
            throw error // Propagate errors to be handled by the caller
        }
    }
    
    // Function to create or add a new account into an account
    func newAccount(newAccountname: String) async throws {
        guard self.authToken != nil else { throw ApiError.urlError }
        
        do{
            let response = try await Api.shared.createAccount(authToken: self.authToken ?? "", name: newAccountname)
            self.currentUser = response.user
        }catch {
            throw error
        }
    }
    
    // Function to transfer from one account to another
    func transfer(toaccountId: String, fromaccountid: String, amountInCents: Int) async throws {
        guard self.authToken != nil else { throw ApiError.urlError }
        
        do{
            let response = try await Api.shared.transfer(authToken: self.authToken ?? "", from: Account(name: "", id: fromaccountid, balance: 0), to: Account(name: "", id: toaccountId, balance: 0), amountInCents: amountInCents)
            self.currentUser = response.user
        }catch {
            throw error
        }
    }

    // Function delete an account
    func deleteAccount(accountId: String) async throws {
        guard let authToken = self.authToken else {
            throw ApiError.urlError
        }
        
        guard let accountIndex = self.currentUser?.accounts.firstIndex(where: { $0.id == accountId }) else {
            // guard is an if statement which checks the first Index
            throw ApiError.unknownError
        }
        
        do {
            let response = try await Api.shared.deleteAccount(authToken: authToken, account: self.currentUser!.accounts[accountIndex])
            DispatchQueue.main.async {
                self.currentUser = response.user
            }
        }//end of do
        catch{
            print("Error deleting an account")
            throw error
        }
        
    }
    var totalAssets: Int {
            currentUser?.accounts.reduce(0) { $0 + $1.balance } ?? 0 //conditional wrapping to sum the total assets
        }
 }
extension UserModel { //extension of the User model to convert the API amountInCents into dollars
    var totalAssetsString: String {
        let totalAssetsValue = Double(totalAssets) / 100 // Convert cents to dollars
        return String(format: "$%.2f", totalAssetsValue) // rounding to two decimal places.
    }
}


