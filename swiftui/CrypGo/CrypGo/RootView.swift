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
        switch (userModel.publicKey) {
        case (.none):
            NavigationStack {
                RegisterView()
                    .environmentObject(userModel)
            }
            .environmentObject(userModel)
        case (.some(_)):
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
