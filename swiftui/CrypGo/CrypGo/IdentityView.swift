//
//  IdentityView.swift
//  Homework3
//
//  Created by Sam King on 1/11/24.
//

import SwiftUI

struct IdentityView: View {
    @EnvironmentObject var userModel: UserModel
    @Environment(\.dismiss) var dismiss
    @State var name: String = ""
    @State var hasChanges = false
    @State var errorString: String? = nil
    
    func onNameChange() {
        hasChanges = userModel.currentUser?.name != name
    }
    
    var body: some View {
        VStack {
            if let errorString = errorString {
                Text(errorString)
                    .padding()
                    .foregroundStyle(.red)
            }
            Form {
                Section {
                    TextField("Name", text: $name)
                        .onChange(of: name) {
                            onNameChange()
                        }
                    let phone = userModel.currentUser?.e164PhoneNumber ?? "No phone set"
                    Text(phone)
                }
                
                Section {
                    Button {
                        userModel.logout()
                    } label: {
                        Text("Logout")
                    }
                }
            }
        }
        .navigationViewStyle(.stack)
        .navigationBarTitleDisplayMode(.inline)
        .toolbarBackground(.blue, for: .navigationBar)
        .toolbarColorScheme(.dark, for: .navigationBar)
        .toolbarBackground(.visible, for: .navigationBar)
        .navigationTitle("Identity")
        .toolbar {
            ToolbarItem(placement: .topBarTrailing) {
                Button("Save") {
                    errorString = nil
                    Task {
                        do {
                            try await userModel.setUserName(name: name)
                            dismiss()
                        } catch let apiError as ApiError {
                            errorString = apiError.message
                        }
                    }
                }
                .disabled(!hasChanges)
            }
        }
        .onAppear {
            name = userModel.currentUser?.name ?? ""
        }
    }
}

#Preview {
    NavigationStack {
        IdentityView()
            .environmentObject(UserModel())
    }
}
