//
//  VerifyCodeView.swift
//  Homework2
//
//  Created by Sam King on 1/5/24.
//

import SwiftUI
import PhoneNumberKit

struct VerifyCodeView: View {
    let phoneNumber: String
    @State var code: String = ""
    
    @State var first: String = ""
    @State var second: String = ""
    @State var third: String = ""
    @State var fourth: String = ""
    @State var fifth: String = ""
    @State var sixth: String = ""
    
    @State var isLoading = false
    @State var errorString: String?
    @FocusState var focused
    
    @EnvironmentObject var userModel: UserModel
    
    func onCodeChange() {
        errorString = nil
        let digits = [$first, $second, $third, $fourth, $fifth, $sixth]
        for digit in digits {
            digit.wrappedValue = ""
        }
        
        for (digit, char) in zip(digits, code) {
            digit.wrappedValue = String(char)
        }
        
        guard code.count == 6 else { return }
        Task {
            isLoading = true
            do {
                try await userModel.verifyCodeAndLogin(e164PhoneNumber: phoneNumber, code: code)
            } catch let apiError {
                errorString = (apiError as? ApiError)?.message ?? "Unknown error"
            }

            isLoading = false
        }
    }
    
    func resendCode() {
        Task {
            isLoading = true
            do {
                let _ = try await Api.shared.sendVerificationToken(e164PhoneNumber: phoneNumber)
            } catch let apiError {
                errorString = (apiError as? ApiError)?.message ?? "Unknown error"
            }
            isLoading = false
        }
    }
    
    var body: some View {
        VStack {
            TextField("", text: $code)
                .keyboardType(.numberPad)
                .focused($focused)
                .foregroundColor(.clear)
                .tint(.clear)
                .onChange(of: code) {
                    onCodeChange()
                }
            Text("What's the code?").bold()
            let phoneNumberString = PartialFormatter().formatPartial(phoneNumber)
            Text("Enter the code we sent to \(phoneNumberString)")
            HStack {
                DigitText(char: $first)
                DigitText(char: $second)
                DigitText(char: $third)
                DigitText(char: $fourth)
                DigitText(char: $fifth)
                DigitText(char: $sixth)
            }
            if let errorString = errorString {
                Text(errorString).foregroundStyle(.red)
            } else {
                Text(" ")
            }
            if isLoading {
                ProgressView()
            } else {
                ProgressView().tint(.clear)
            }
            Button {
                resendCode()
            } label: {
                Text("Resend").bold().frame(maxWidth: .infinity)
            }
            .buttonStyle(.borderedProminent)
            .padding()
        }
        .onAppear {
            focused = true
        }
    }
}

struct DigitText: View {
    @Binding var char: String
    
    var body: some View {
        VStack {
            Text(char).frame(width: 30, height: 30)
            Rectangle().frame(width: 30, height: 1).foregroundColor(.gray.opacity(0.5))
        }
    }
}

#Preview {
    VerifyCodeView(phoneNumber: "+15005550000")
}
