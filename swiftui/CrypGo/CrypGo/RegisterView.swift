//
//  RegisterView.swift
//  CrypGo
//
//  Created by Manoj Elango on 3/16/24.
//

import Foundation
import SwiftUI

struct RegisterView: View {
    @State private var username = ""
    @State private var password = ""
    @State private var confirmPassword = ""
    @EnvironmentObject var userModel: UserModel
    
    @State private var publicKey: String?
    @State private var privateKey: String?
    @State private var errorMessage: String?
    
    var body: some View {
        VStack {
            
            
            Image("cryptologo")
                .resizable()
                .aspectRatio(contentMode: .fit)
                .frame(width: 100, height: 100)
                .padding(.bottom, 20)
            
            Text("CrypGo") // Big centered heading
                .padding(.bottom, 20)
                .font(Font.custom("Retro Gaming", size: 36))
            
            TextField("Username", text: $username)
                .padding()
                .background(Color.gray.opacity(0.2))
                .cornerRadius(5.0)
                .padding(.bottom, 20)
                .font(Font.custom("Retro Gaming", size: 18))
            
            SecureField("Password", text: $password)
                .padding()
                .background(Color.gray.opacity(0.2))
                .cornerRadius(5.0)
                .padding(.bottom, 20)
                .font(Font.custom("Retro Gaming", size: 18))
            
            SecureField("Confirm Password", text: $confirmPassword)
                .padding()
                .background(Color.gray.opacity(0.2))
                .cornerRadius(5.0)
                .padding(.bottom, 20)
                .font(Font.custom("Retro Gaming", size: 18))
            
            Button(action: {
                userModel.generateKeys { publicKey, privateKey, error in
                    self.publicKey = publicKey
                    self.privateKey = privateKey
                    self.errorMessage = error
                    if let publicKey = publicKey, let privateKey = privateKey {
                        print("Public Key: \(publicKey)")
                        print("Private Key: \(privateKey)")
                        userModel.privateKey = privateKey
                        userModel.publicKey = publicKey
                        userModel.saveKeys(privateKey: privateKey, publicKey: publicKey)
                    } else if let error = error {
                        print("Error: \(error)")
                    }
                }
            }) {
                ZStack{
                    Image("app_button")
                        .resizable()
                        .aspectRatio(contentMode: .fit)
                        .frame(width: 300, height: 75) // Adjust the width and height as needed
                        .padding() // Optional: Add padding to the image
                    Text("Register")
                        .foregroundColor(.white)
                        .padding()
                        .frame(maxWidth: .infinity)
                        .background(Color.clear)
                        .cornerRadius(5.0)
                        .font(Font.custom("Retro Gaming", size: 18))
                }
                
            }
            if let publicKey = publicKey,
               let privateKey = privateKey {
                Text("Public Key: \(publicKey)")
                Text("Private Key: \(privateKey)")
            }
            
            if let errorMessage = errorMessage {
                Text(errorMessage)
                    .foregroundColor(.red)
            }
        }
        .padding()
    }
}

struct RegisterView_Previews: PreviewProvider {
    static var previews: some View {
        RegisterView()
    }
}
