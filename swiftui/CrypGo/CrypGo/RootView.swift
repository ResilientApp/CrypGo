//
//  RootView.swift
//  Homework3
//
//  Created by Sam King on 1/11/24.
//

import SwiftUI

struct RootView: View {
    @StateObject var userModel = UserModel()
    
    // NOTE: they should support two cases
    //   (1) send -> verify replace with Home
    //   (2) loading replace with Home
    var body: some View {
        switch (userModel.authToken, userModel.currentUser) {
        case (.none, .none):
            NavigationStack {
                EnterPhoneNumberView()
            }
            .environmentObject(userModel)
        case (.some(let authToken), .none):
            LoadingView(authToken: authToken)
                .environmentObject(userModel)
        case (_, .some):
            NavigationStack {
                HomeView()
            }
            .environmentObject(userModel)
        }
    }
}

#Preview {
    RootView()
}
