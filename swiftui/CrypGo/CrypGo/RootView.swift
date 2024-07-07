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
        if userModel.isRegistered {
            NavigationStack {
                HomeView()
            }
            .environmentObject(userModel)
        } else {
            NavigationStack {
                RegisterView()
                    .environmentObject(userModel)
            }
            .environmentObject(userModel)
        }
    }
}

#Preview {
    RootView()
}
