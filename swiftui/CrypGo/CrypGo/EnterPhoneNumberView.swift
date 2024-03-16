//
//  ContentView.swift
//  w24-189e-hw1
//
//  Created by Sam King on 1/4/24.
//

import SwiftUI
//import PhoneNumberKit

struct EnterPhoneNumberView: View {
    @State var e164PhoneNumber: String = ""
    @State var navigateToVerify: Bool = false
    
    @State var phoneNumberString: String = ""
    @State var phoneNumberColor = Color.primary
    @State var errorString: String?
    @State var isLoading = false
    @FocusState var keyboardShowing
    
////    let phoneNumberKit = PhoneNumberKit()
//    
//    func phoneNumberChange() {
//        phoneNumberString = PartialFormatter().formatPartial(phoneNumberString)
//        phoneNumberColor = .primary
//        errorString = nil
//    }
//    
//    func nextClick() {
//        guard let phoneNumber = try? phoneNumberKit.parse(phoneNumberString) else {
//            print("invalid phone number")
//            phoneNumberColor = .red
//            return
//        }
//        
//        Task {
//            isLoading = true
//            e164PhoneNumber = phoneNumberKit.format(phoneNumber, toType: .e164)
//            do {
//                let _ = try await Api.shared.sendVerificationToken(e164PhoneNumber: e164PhoneNumber)
//                navigateToVerify = true
//            } catch let apiError {
//                phoneNumberColor = .red
//                errorString = (apiError as? ApiError)?.message ?? "Unknown error"
//            }
//            isLoading = false
//        }
//        print("nextclik done")
//    }
    
    var body: some View {
        VStack {
            Text("Enter your mobile number").bold()
            Spacer().frame(height: 20)
            HStack {
                Text("🇺🇸 +1")
//                TextField("(500) 555-1234", text: $phoneNumberString)
//                    .keyboardType(.phonePad)
//                    .foregroundColor(phoneNumberColor)
//                    .focused($keyboardShowing)
//                    .onChange(of: phoneNumberString) {
//                        phoneNumberChange()
//                    }
            }
            .padding([.leading, .trailing])
            Rectangle()
                .padding([.leading, .trailing])
                .frame(height: 1)
                .foregroundColor(.gray.opacity(0.5))
            Spacer().frame(height: 24)
//            Button {
//                nextClick()
//            } label: {
//                if !isLoading {
//                    Text("Next").bold().frame(maxWidth: .infinity)
//                } else {
//                    ProgressView().tint(.white).frame(maxWidth: .infinity)
//                }
//            }
//            .buttonStyle(.borderedProminent)
//            //.disabled(isLoading)
//            if let errorString = errorString {
//                Text(errorString).foregroundStyle(.red)
//            }
            
        }
        .padding()
        .frame(maxWidth: .infinity, maxHeight: .infinity)
        .contentShape(Rectangle())
        .onTapGesture {
            keyboardShowing = false
        }
        .navigationDestination(isPresented: $navigateToVerify) {
            VerifyCodeView(phoneNumber: e164PhoneNumber)
        }
    }
}

#Preview {
    EnterPhoneNumberView()
}
