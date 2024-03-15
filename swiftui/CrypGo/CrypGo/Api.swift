//
//  Api.swift
//  Homework2
//
//  Created by Sam King on 1/5/24.
//

import Foundation

struct SendVerificationRequest: Codable {
    let e164PhoneNumber: String
}

struct CheckVerificationRequest: Codable {
    let e164PhoneNumber: String
    let code: String
}

struct UpdateNameRequest: Codable {
    let name: String
}

struct CreateAccountRequest: Codable {
    let name: String
}

struct DepositWithdrawRequest: Codable {
    let amount: Int
}

struct TransferRequest: Codable {
    let amount: Int
    let destinationAccountId: String
}

struct Account: Codable, Identifiable, Hashable {
    let name: String
    let id: String
    let balance: Int
    
    func balanceInUsd() -> Double { return Double(balance) / 100 }
    func balanceString() -> String { return String(format: "$%0.02f", balanceInUsd()) }
}

struct User: Codable {
    let e164PhoneNumber: String
    let name: String?
    let userId: String
    let accounts: [Account]
}

struct UserResponse: Codable {
    let user: User
}

struct ApiError: Codable, Error {
    let errorCode: String
    let message: String
    
    static let encodingError = ApiError(errorCode: "encoding_error", message: "Could not encode arguments")
    static let decodingError = ApiError(errorCode: "decoding_error", message: "Could not decode response")
    static let urlError = ApiError(errorCode: "url_error", message: "Could not create URL object")
    static let urlSessionError = ApiError(errorCode: "url_session_error", message: "Could not fetch data from the URL session")
    static let unknownError = ApiError(errorCode: "unknown_client_error", message: "An unknown error happened client side")
}

struct SendVerificationResponse: Codable {
    let status: String
}

struct CheckVerificationResponse: Codable {
    let authToken: String
}

struct JsonHttp {
    static let shared = JsonHttp()
    
    func put<ResponseType>(url: String, data: Encodable, headers: [String : String]) async throws -> ResponseType where ResponseType : Decodable {
        return try await httpMethod(method: "PUT", url: url, data: data, headers: headers)
    }

    func post<ResponseType>(url: String, data: Encodable, headers: [String : String]) async throws -> ResponseType where ResponseType : Decodable {
        return try await httpMethod(method: "POST", url: url, data: data, headers: headers)
    }
    
    func get<ResponseType>(url: String, headers: [String : String]) async throws -> ResponseType where ResponseType : Decodable {
        return try await httpMethod(method: "GET", url: url, data: nil, headers: headers)
    }
    
    func delete<ResponseType>(url: String, headers: [String : String]) async throws -> ResponseType where ResponseType : Decodable {
        return try await httpMethod(method: "DELETE", url: url, data: nil, headers: headers)
    }
    
    private func httpMethod<ResponseType>(method: String, url: String, data: Encodable?, headers: [String : String]) async throws -> ResponseType where ResponseType : Decodable {
        
        guard let url = URL(string: url) else { throw ApiError.urlError }

        var request = URLRequest(url: url)
        if let data = data {
            let encoder = JSONEncoder()
            encoder.dateEncodingStrategy = .secondsSince1970
            guard let jsonData = try? encoder.encode(data) else { throw ApiError.encodingError }
            request.httpBody = jsonData
        }
        request.httpMethod = method
        request.addValue("application/json", forHTTPHeaderField: "Content-Type")
        
        for (key, value) in headers {
            request.addValue(value, forHTTPHeaderField: key)
        }
        
        guard let (data, response) = try? await URLSession.shared.data(for: request) else { throw ApiError.urlSessionError }
        guard let httpResponse = response as? HTTPURLResponse else { throw ApiError.decodingError }

        let decoder = JSONDecoder()
        decoder.dateDecodingStrategy = .secondsSince1970
        if httpResponse.statusCode >= 200 && httpResponse.statusCode < 300 {
            guard let responseObject = try? decoder.decode(ResponseType.self, from: data) else {
                throw ApiError.decodingError
            }
            return responseObject
        } else {
            throw (try? decoder.decode(ApiError.self, from: data)) ?? ApiError.decodingError
        }
    }
}

class Api {
    static let shared = Api()
    
    var appId: String?
    var baseUrl = "https://ecs189e-sms-verification.uc.r.appspot.com"
    
    func sendVerificationToken(e164PhoneNumber: String) async throws -> SendVerificationResponse {
        
        let url = baseUrl + "/send_verification_token"
        let headers = appId.map({ ["x-app-id": $0] }) ?? [:]
        let requestObject = SendVerificationRequest(e164PhoneNumber: e164PhoneNumber)
        
        return try await JsonHttp.shared.post(url: url, data: requestObject, headers: headers)
    }
    
    func checkVerificationToken(e164PhoneNumber: String, code: String) async throws -> CheckVerificationResponse {

        let url = baseUrl + "/check_verification_token"
        let headers = appId.map({ ["x-app-id": $0] }) ?? [:]
        let requestObject = CheckVerificationRequest(e164PhoneNumber: e164PhoneNumber, code: code)

        return try await JsonHttp.shared.post(url: url, data: requestObject, headers: headers)
    }
    
    func user(authToken: String) async throws -> UserResponse {
        let url = baseUrl + "/user"
        var headers: [String: String] = ["x-auth-token": authToken]
        if let appId = appId { headers["x-app-id"] = appId }

        return try await JsonHttp.shared.get(url: url, headers: headers)
    }
    
    func setUserName(authToken: String, name: String) async throws -> UserResponse {
        let url = baseUrl + "/user"
        var headers: [String: String] = ["x-auth-token": authToken]
        if let appId = appId { headers["x-app-id"] = appId }
        let requestObject = UpdateNameRequest(name: name)

        return try await JsonHttp.shared.put(url: url, data: requestObject, headers: headers)
    }
    
    func createAccount(authToken: String, name: String) async throws -> UserResponse {
        let url = baseUrl + "/user/account/\(UUID().uuidString)"
        var headers: [String: String] = ["x-auth-token": authToken]
        if let appId = appId { headers["x-app-id"] = appId }
        let requestObject = CreateAccountRequest(name: name)

        return try await JsonHttp.shared.post(url: url, data: requestObject, headers: headers)
    }
    
    func deleteAccount(authToken: String, account: Account) async throws -> UserResponse {
        let url = baseUrl + "/user/account/\(account.id)"
        var headers: [String: String] = ["x-auth-token": authToken]
        if let appId = appId { headers["x-app-id"] = appId }

        return try await JsonHttp.shared.delete(url: url, headers: headers)
    }
    
    func deposit(authToken: String, account: Account, amountInCents: Int) async throws -> UserResponse {
        let url = baseUrl + "/user/account/\(account.id)/deposit"
        var headers: [String: String] = ["x-auth-token": authToken]
        if let appId = appId { headers["x-app-id"] = appId }
        let requestObject = DepositWithdrawRequest(amount: amountInCents)

        return try await JsonHttp.shared.post(url: url, data: requestObject, headers: headers)
    }
    
    func withdraw(authToken: String, account: Account, amountInCents: Int) async throws -> UserResponse {
        let url = baseUrl + "/user/account/\(account.id)/withdraw"
        var headers: [String: String] = ["x-auth-token": authToken]
        if let appId = appId { headers["x-app-id"] = appId }
        let requestObject = DepositWithdrawRequest(amount: amountInCents)

        return try await JsonHttp.shared.post(url: url, data: requestObject, headers: headers)
    }
    
    func transfer(authToken: String, from: Account, to: Account, amountInCents: Int) async throws -> UserResponse {
        let url = baseUrl + "/user/account/\(from.id)/transfer"
        var headers: [String: String] = ["x-auth-token": authToken]
        if let appId = appId { headers["x-app-id"] = appId }
        let requestObject = TransferRequest(amount: amountInCents, destinationAccountId: to.id)

        return try await JsonHttp.shared.post(url: url, data: requestObject, headers: headers)
    }
}
