//
//  ContentView.swift
//  CrypGo
//
//  Created by Apple on 07/06/24.
//

import SwiftUI

struct LoginPage: View {
    @State private var username: String = ""
    @State private var password: String = ""
    
    var body: some View {
        ZStack {
            // Background color split
            VStack(spacing: 0) {
                Color(hex: "#323335")
                    .edgesIgnoringSafeArea(.all)
                   // .frame(height: UIScreen.main.bounds.height / 3)
//                Color(hex: "#ACF7D1")
//                    .cornerRadius(20, corners: [.topLeft, .topRight]) // Adding corner radius
//                    .frame(height: UIScreen.main.bounds.height * 2 / 3)
            }
            .edgesIgnoringSafeArea(.all)
            
            VStack {
                Spacer()
                
                Text("Log in to CrypGo!")
                    .font(.custom("Public Sans", size: 24))
                    .foregroundColor(.white)
                    .padding(.bottom, 20)
//
//                Image("CrypGoLogo") // Ensure you have the logo image in your assets
//                    .resizable()
//                    .aspectRatio(contentMode: .fit)
//                    .frame(width: 100, height: 100)
//                    .padding(.bottom, 20)
//
                VStack(alignment: .leading) {
                    Text("Username")
                        .font(.custom("Public Sans", size: 18))
                        .foregroundColor(.white)
                        .padding(.bottom, 5)
                    
                    TextField("", text: $username)
                        .padding()
                        .background(Color.white)
                        .cornerRadius(5.0)
                        .overlay(
                            RoundedRectangle(cornerRadius: 5)
                                .stroke(Color.black, lineWidth: 2)
                        )
                        .padding(.bottom, 20)
                        .frame(height: 50)
                }
                .padding(.horizontal, 40)
                
                VStack(alignment: .leading) {
                    Text("Password")
                        .font(.custom("Public Sans", size: 18))
                        .foregroundColor(.white)
                        .padding(.bottom, 5)
                    
                    SecureField("", text: $password)
                        .padding()
                        .background(Color.white)
                        .cornerRadius(5.0)
                        .overlay(
                            RoundedRectangle(cornerRadius: 5)
                                .stroke(Color.black, lineWidth: 2)
                        )
                        .padding(.bottom, 20)
                        .frame(height: 50)
                }
                .padding(.horizontal, 40)
                
                Button(action: {
                    // Add login action here
                }) {
                    Text("LOGIN")
                        .font(.custom("Public Sans", size: 18))
                        .foregroundColor(.black)
                        .frame(width: 250, height: 50)
                        .background(Color(hex: "#41A882"))
                        .cornerRadius(30)
                        .overlay(
                            RoundedRectangle(cornerRadius: 30)
                                .stroke(Color.black, lineWidth: 2)
                        )
                }
                .padding(.top, 20)
                
                Spacer()
            }
            .padding()
        }
    }
}

extension Color {
    init(hex: String) {
        let scanner = Scanner(string: hex)
        scanner.scanLocation = 1
        var rgbValue: UInt64 = 0
        scanner.scanHexInt64(&rgbValue)
        
        let red = Double((rgbValue & 0xff0000) >> 16) / 255.0
        let green = Double((rgbValue & 0xff00) >> 8) / 255.0
        let blue = Double(rgbValue & 0xff) / 255.0
        
        self.init(red: red, green: green, blue: blue)
    }
}

extension View {
    func cornerRadius(_ radius: CGFloat, corners: UIRectCorner) -> some View {
        clipShape(RoundedCorner(radius: radius, corners: corners) )
    }
}

struct RoundedCorner: Shape {
    var radius: CGFloat = .infinity
    var corners: UIRectCorner = .allCorners
    
    func path(in rect: CGRect) -> Path {
        let path = UIBezierPath(roundedRect: rect, byRoundingCorners: corners, cornerRadii: CGSize(width: radius, height: radius))
        return Path(path.cgPath)
    }
}

struct LoginPage_Previews: PreviewProvider {
    static var previews: some View {
        LoginPage()
    }
}

