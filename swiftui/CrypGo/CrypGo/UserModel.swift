//
//  UserModel.swift
//  Homework3
//
//  Created by Sam King on 1/11/24.
//

import Foundation

@MainActor class UserModel: ObservableObject {
    // Authentication token and current user information
    @Published var authToken: String?
    @Published var currentUser: User?
    
    let missingAuthToken = ApiError(errorCode: "missing_auth_token_error", message: "Auth token is not set")
    let invalidAmount = ApiError(errorCode: "invalid_amount_error", message: "Invalid amount")
    
    init() {
        authToken = UserDefaults.standard.string(forKey: "authToken")
    }
    
    static func withAuthToken() -> UserModel {
        let userModel = UserModel()
        userModel.authToken = "1234"
        return userModel
    }
    
    func setUserName(name: String) async throws {
        guard let authToken = authToken else {
            throw missingAuthToken
        }
        
        let userResponse = try await Api.shared.setUserName(authToken: authToken, name: name)
        setCurrentUser(user: userResponse.user)
    }
    
    func verifyCodeAndLogin(e164PhoneNumber: String, code: String) async throws {
        let verifyResponse = try await Api.shared.checkVerificationToken(e164PhoneNumber: e164PhoneNumber, code: code)
        print("we're logged in, fetching user")
        let userResponse = try await Api.shared.user(authToken: verifyResponse.authToken)
        login(authToken: verifyResponse.authToken, user: userResponse.user)
    }
    
    func loadUser() async throws {
        guard let authToken = authToken else {
            throw missingAuthToken
        }
        
        let userResponse = try await Api.shared.user(authToken: authToken)
        setCurrentUser(user: userResponse.user)
    }
    
    func logout() {
        self.authToken = nil
        self.currentUser = nil
        saveAuthToken(authToken: nil)
    }
    
    private func setCurrentUser(user: User?) {
        self.currentUser = user
    }
    
    private func login(authToken: String, user: User) {
        saveAuthToken(authToken: authToken)
        self.authToken = authToken
        self.currentUser = user
    }
    
    // NOTE: we need to tell them about UserDefaults.standard and synchronize
    private func saveAuthToken(authToken: String?) {
        UserDefaults.standard.setValue(authToken, forKey: "authToken")
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


