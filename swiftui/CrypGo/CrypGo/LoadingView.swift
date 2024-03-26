//
//  LoadingView.swift
//  Homework3
//
//  Created by Sam King on 1/11/24.
//

import SwiftUI

struct LoadingView: View {
    let authToken: String
    @EnvironmentObject var userModel: UserModel
    @State var errorString: String? = nil
    
    var body: some View {
        VStack {
            ProgressView()
                .controlSize(.large)
                .tint(.white)
            if let errorString = errorString {
                Text(errorString)
                    .bold()
                    .foregroundStyle(.white)
            }
        }
        .frame(maxWidth: .infinity, maxHeight: .infinity)
        .background(.blue)
        // NOTE: mention .task
        .task {
        }
    }
}

#Preview {
    LoadingView(authToken: "1234")
        .environmentObject(UserModel())
}
