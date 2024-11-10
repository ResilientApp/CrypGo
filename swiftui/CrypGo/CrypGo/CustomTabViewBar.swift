//
//  CustomTabViewBar.swift
//  CrypGo
//
//  Created by Manoj Elango on 11/9/24.
//

import SwiftUI

enum Tab: String, CaseIterable {
//    case message
    case house
    case gearshape
}

struct CustomTabBar: View {
    @Binding var selectedTab: Tab
    
    var body: some View {
        VStack {
            HStack {
                ForEach(Tab.allCases, id: \.rawValue) { tab in
                    Spacer()
                    Image(systemName: tab.rawValue)
                        .scaleEffect(selectedTab == tab ? 1.5 : 1.0)
                        .foregroundColor(selectedTab == tab ? .blue : .white)
                        .font(.system(size: 22))
                        .onTapGesture {
                            withAnimation(.easeIn(duration: 0.1)) {
                                selectedTab = tab
                            }
                        }
                    Spacer()
                }
            }
            .frame(height: 60)
            .background(Color("CustomBar"))
            .cornerRadius(10)
            .padding()
        }
    }
}

#Preview {
    CustomTabBar(selectedTab: .constant(.house))
}
