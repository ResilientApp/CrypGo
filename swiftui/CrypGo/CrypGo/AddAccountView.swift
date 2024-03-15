//
//  AddAccountView.swift
//  Homework3
//
//  Created by Manoj Elango on 2/11/24.
//

import Foundation
import SwiftUI
// SwiftUI view for adding a new account.
struct AddAccountView: View {
    @Environment(\.presentationMode) var presentationMode
    @EnvironmentObject var userModel: UserModel
    @State private var accountName = ""
    
    var body: some View {
        VStack{
            TextField("Account Name", text: $accountName)
                .textFieldStyle(RoundedBorderTextFieldStyle())
                .padding()
            
            Button(action: {
                //error commands or print statements 
                Task {
                    do {
                        try await userModel.newAccount(newAccountname: accountName)
                    } catch {
                        _ = "Withdrawal failed: \(error)"
                    }
                }
                presentationMode.wrappedValue.dismiss()
            }) {
                Text("Create Account")
                    .font(.headline)
                    .foregroundColor(.white)
                    .padding()
                    .frame(maxWidth: .infinity)
                    .background(Color.blue)
                    .cornerRadius(10)
            }
        }
    }
}
