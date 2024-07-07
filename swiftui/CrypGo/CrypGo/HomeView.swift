//
//  HomeView.swift
//  Homework3
//
//  Created by Sam King on 1/11/24.
//

import SwiftUI

struct HomeView: View {
    
    var body: some View {
        @State var navigateToIdentity = false
        @State var isShowingAddAccountView = false
        ZStack{
            Color(Color("PrimaryBackground"))
                .ignoresSafeArea()
            VStack {
                HomeOverviewView()
                AccountSummaryView()
            }
            .frame(maxWidth: .infinity)
            .ignoresSafeArea()
            .toolbar {
                ToolbarItem(placement: .bottomBar) {
                    HStack{
                        Button {
                            navigateToIdentity = true
                        } label: {
                            Image(systemName: "person.crop.circle.fill")
                                .tint(.white)
                                .foregroundColor(.black)
                        }
                        Button {
                            navigateToIdentity = true
                        } label: {
                            Image(systemName: "person.crop.circle.fill")
                                .tint(.white)
                                .foregroundColor(.black)
                        }
                        Button(action: {
                            isShowingAddAccountView = true
                        }) {
                            Image(systemName: "plus")
                                .font(.headline)
                                .foregroundColor(.blue)
                                .frame(width: 35, height: 35) // Adjust padding to manage the size of the circle
                                .background(Color.white)
                                .clipShape(Circle())
                                .shadow(radius: 2) // Adjust shadow to your liking
                        }
                        Button {
                            navigateToIdentity = true
                        } label: {
                            Image(systemName: "person.crop.circle.fill")
                                .tint(.white)
                                .foregroundColor(.black)
                        }
                        Button {
                            navigateToIdentity = true
                        } label: {
                            Image(systemName: "person.crop.circle.fill")
                                .tint(.white)
                                .foregroundColor(.black)
                        }
                    }
                }
            }//end of toolbar
            .navigationDestination(isPresented: $navigateToIdentity) {
                IdentityView()
            }
            .navigationDestination(isPresented: $isShowingAddAccountView) {
                AddAccountView()
            }
        }
    }
}
// Subview for displaying the total assets and a button to navigate to adding a new account and go to settings.
struct HomeOverviewView: View {
    @EnvironmentObject var userModel: UserModel
    
    @State private var searchText: String = ""
    @State private var prompt: String = "Search Transactions"
    var body: some View {
        VStack {
            Text("Account Balance")
                .foregroundStyle(.black)
                .font(Font.custom("PublicSans-ExtraLight", size: 22))
                .padding(.top, 100)
            Text(userModel.totalAssetsString)
                .font(Font.custom("PublicSans-SemiBold.ttf", size: 50))
                .foregroundStyle(.black)
            
        }//end of VStack
        .searchable(text: $searchText, prompt: prompt)
        .frame(height: 300)
        .frame(maxWidth: .infinity)
        .background(Color("DashboardPrimary"))
        .cornerRadius(20)
        
    }
}

// View for summarizing the user's accounts.
struct AccountSummaryView: View {
    @EnvironmentObject var userModel: UserModel
    var body: some View {
        VStack{
            HStack{
                Text("Transactions")
                    .padding()
                Spacer()
            }
            Divider()
            HStack{
                Image(systemName: "dollarsign.circle")
                    .padding()
                VStack{
                    HStack{
                        Text("Bitcoin")
                        Spacer()
                    }
                    HStack{
                        Text("17 Sep 2023 11:21 AM")
                        Spacer()
                    }
                    
                }
                Spacer()
                VStack{
                    Text("$ 350")
                    Text("Pending")
                }
            }
            HStack{
                Image(systemName: "dollarsign.circle")
                    .padding()
                VStack{
                    HStack{
                        Text("Bitcoin")
                        Spacer()
                    }
                    HStack{
                        Text("17 Sep 2023 11:21 AM")
                        Spacer()
                    }
                    
                }
                Spacer()
                VStack{
                    Text("$ 350")
                    Text("Pending")
                }
            }
            HStack{
                Image(systemName: "dollarsign.circle")
                    .padding()
                VStack{
                    HStack{
                        Text("Bitcoin")
                        Spacer()
                    }
                    HStack{
                        Text("17 Sep 2023 11:21 AM")
                        Spacer()
                    }
                    
                }
                Spacer()
                VStack{
                    Text("$ 350")
                    Text("Pending")
                }
            }
            HStack{
                Image(systemName: "dollarsign.circle")
                    .padding()
                VStack{
                    HStack{
                        Text("Bitcoin")
                        Spacer()
                    }
                    HStack{
                        Text("17 Sep 2023 11:21 AM")
                        Spacer()
                    }
                    
                }
                Spacer()
                VStack{
                    Text("$ 350")
                    Text("Pending")
                }
            }
            HStack{
                Image(systemName: "dollarsign.circle")
                    .padding()
                VStack{
                    HStack{
                        Text("Bitcoin")
                        Spacer()
                    }
                    HStack{
                        Text("17 Sep 2023 11:21 AM")
                        Spacer()
                    }
                    
                }
                Spacer()
                VStack{
                    Text("$ 350")
                    Text("Pending")
                }
            }
            HStack{
                Image(systemName: "dollarsign.circle")
                    .padding()
                VStack{
                    HStack{
                        Text("Bitcoin")
                        Spacer()
                    }
                    HStack{
                        Text("17 Sep 2023 11:21 AM")
                        Spacer()
                    }
                    
                }
                Spacer()
                VStack{
                    Text("$ 350")
                    Text("Pending")
                }
            }
        }
            .background(.black)
            .padding(.left, 5)
            .padding(.right, 5)
            .cornerRadius(20)
            .foregroundColor(.white)
    }
}

//Custum Padding
enum NoFlipEdge {
    case left, right
}

struct NoFlipPadding: ViewModifier {
    let edge: NoFlipEdge
    let length: CGFloat?
    @Environment(\.layoutDirection) var layoutDirection
    
    private var computedEdge: Edge.Set {
        if layoutDirection == .rightToLeft {
            return edge == .left ? .trailing : .leading
        } else {
            return edge == .left ? .leading : .trailing
        }
    }
    
    func body(content: Content) -> some View {
        content
            .padding(computedEdge, length)
    }
}

extension View {
    func padding(_ edge: NoFlipEdge, _ length: CGFloat? = nil) -> some View {
        self.modifier(NoFlipPadding(edge: edge, length: length))
    }
}

// View for displaying individual account details in a row.
struct AccountRow: View {
    let account: Account
    
    var body: some View {
        HStack {
            Text(account.name)
                .font(.headline)
            Spacer()
            Text(account.balanceString())
                .font(.subheadline)
        }
        .padding()
        .background(Color.white)
        .cornerRadius(10)
        .shadow(radius: 2)
    }
}
// Detailed view for one specific account.
struct AccountDetailView: View {
    @Environment(\.presentationMode) var presentationMode
    @EnvironmentObject var userModel: UserModel
    let account: Account
    @State private var amountText: String = ""
    @State private var alertMessage: String = ""
    @State private var showAlert: Bool = false
    @State private var refreshFlag = false
    @State private var showingAccountsList = false
    
    var body: some View {
        VStack {
            
            Text(account.name)
                .font(.headline)
            Text("Balance: \(account.balanceString())")
                .font(.subheadline)
            
            TextField("Amount", text: $amountText)
                .keyboardType(.decimalPad)
                .textFieldStyle(RoundedBorderTextFieldStyle())
                .padding()
            
            HStack {
                Button("Deposit") {
                    guard let amount = Int(amountText) else {
                        alertMessage = "Please enter a valid amount."
                        showAlert = true
                        return
                    }
                    deposit(amountInCents: amount, userModel: userModel)
                    
                }
                .buttonStyle(ActionButtonStyle())
                
                Button("Withdraw") {
                    guard let amount = Int(amountText) else {
                        alertMessage = "Please enter a valid amount."
                        showAlert = true
                        return
                    }
                    withdraw(amountInCents: amount, userModel: userModel)
                }
                .buttonStyle(ActionButtonStyle())
                
                
                Button("Transfer") {
                    guard Int(amountText) != nil else {
                        alertMessage = "Please enter a valid amount."
                        showAlert = true
                        return
                    }
                    
                    
                    
                    // Assuming userModel is an observable object
                    if let accounts = userModel.currentUser?.accounts {
                        if accounts.isEmpty {
                            alertMessage = "No accounts found."
                            showAlert = true
                        } else {
                            guard Int(amountText) ?? 0 < account.balance else {
                                alertMessage = "Your account has insufficient funds"
                                showAlert = true
                                return
                            }
                            //list of accounts
                            showingAccountsList.toggle()
                        }
                    }
                }
                //UI of it
                .sheet(isPresented: $showingAccountsList) {
                    
                    List(userModel.currentUser?.accounts ?? []) { account in
                        Button(action: {
                            // Call a function with the account name as an argument
                            performTransfer(accountName: account.id, amountInCents: Int(amountText) ?? 0, userModel: userModel)
                            showingAccountsList.toggle()
                        }) {
                            // AccountRow content
                            AccountRow(account: account)
                        }
                        .environmentObject(userModel)
                    }
                }
                .buttonStyle(ActionButtonStyle())
            }//end of Hstack
        }//end of Vstack
        
        
        //delete account :
        .navigationBarItems(trailing: Button(action: {
            Task {
                do {
                    // Attempt to delete the account
                    try await userModel.deleteAccount(accountId: account.id)
                    await MainActor.run {
                        presentationMode.wrappedValue.dismiss()
                    }
                } catch {
                    // Handle errors, for example by showing an alert
                    alertMessage = "Failed to delete account: \(error.localizedDescription)"
                    showAlert = true
                }
            }
        }) {
            Image(systemName: "trash")
        })
        //end of deleteAccount logic
        
        .environmentObject(userModel)
        .navigationBarTitle("Account Details", displayMode: .inline)
        .padding()
        .alert(isPresented: $showAlert) {
            Alert(title: Text("Alert"), message: Text(alertMessage), dismissButton: .default(Text("OK")))
        }
    }
    
    //Function to make the transfer
    func performTransfer(accountName: String, amountInCents: Int, userModel: UserModel) {
        // Your implementation here
        print("Performing transfer for account: \(accountName)")
        // Add your transfer logic here
        // Use a List to display the accounts
        
        Task {
            do {
                try await userModel.transfer(toaccountId: accountName, fromaccountid: account.id, amountInCents: amountInCents)
                alertMessage = "Deposit successful."
                presentationMode.wrappedValue.dismiss()
            } catch {
                alertMessage = "Deposit failed: \(error.localizedDescription)"
            }
            showAlert = true
        }
    }
    
    private func deposit(amountInCents: Int, userModel: UserModel) {
        Task {
            do {
                try await userModel.deposit(accountId: account.id, amountInCents: amountInCents)
                alertMessage = "Deposit successful."
                presentationMode.wrappedValue.dismiss()
            } catch {
                alertMessage = "Deposit failed: \(error.localizedDescription)"
            }
            showAlert = true
        }
    }
    
    private func withdraw(amountInCents: Int, userModel: UserModel) {
        //        @EnvironmentObject var userModel: UserModel
        guard amountInCents > 0 else {
            alertMessage = "Please enter a positive amount to withdraw."
            showAlert = true
            return
        }//end of else
        // Check if the account has sufficient funds for withdrawal
        if amountInCents > account.balance{
            alertMessage = "Your account has insufficient funds"
            showAlert = true
            return
        }
        Task {
            do {
                try await userModel.withdraw(accountId: account.id, amountInCents: amountInCents)
                alertMessage = "Withdrawal successful."
                presentationMode.wrappedValue.dismiss()
            } catch {
                alertMessage = "Withdrawal failed: \(error.localizedDescription)"
            }
            showAlert = true
        }// end of Task
    } //end of withdraw
}//end of struct


//Applied to Button views to create a consistent style across the app.
struct ActionButtonStyle: ButtonStyle {
    func makeBody(configuration: Configuration) -> some View {
        configuration.label
            .foregroundColor(.white)
            .padding()
            .background(Color.blue)
            .cornerRadius(10)
            .scaleEffect(configuration.isPressed ? 0.95 : 1.0)
    }
}//end of ActionButtonStyle.

#Preview {
    NavigationStack {
        HomeView()
            .environmentObject(UserModel())
    }
}
