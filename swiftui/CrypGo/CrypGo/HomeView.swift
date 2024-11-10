//
//  HomeView.swift
//  Homework3
//
//  Created by Sam King on 1/11/24.
//

import SwiftUI

struct PlantData: Identifiable {
    let id = UUID()
    let name: String
    let health: String
    let lastWatered: String
    let imageName: String
}

struct TankData: Identifiable {
    let id = UUID()
    let dataName: String
    let value: String
    let status: String
}

struct HomeView: View {
    @State private var selectedTab: Tab = .house
    
    var body: some View {
        ZStack {
            VStack {
                // Top-fixed HomeOverviewView
                if selectedTab == .house {
                    HomeContentView()
                        .frame(maxWidth: .infinity, maxHeight: .infinity)
                } else if selectedTab == .gearshape {
                    SettingsView()
                }
                
                // Bottom-fixed CustomTabBar
                CustomTabBar(selectedTab: $selectedTab)
                    .frame(maxWidth: .infinity)
                    .padding(.bottom, 10)
            }
        }
    }
}


struct HomeContentView: View {
    @EnvironmentObject var userModel: UserModel
    
    var body: some View {
        VStack(spacing: 0) {
            // Fixed HomeOverviewView at the top
           
            
            // Scrollable content for plant and tank data
            ScrollView {
                VStack {
                    HomeOverviewView()
                    PlantCarouselView()
                    FishTankDataView()
                }
            }
        }
    }
}

// Plant Carousel View
struct PlantCarouselView: View {
    @State var plants: [PlantData] = [
        PlantData(name: "Manoj-Avatar", health: "Healthy", lastWatered: "2 days ago", imageName: "manoj-avatar"),
        PlantData(name: "Manoj-Avatar", health: "Thriving", lastWatered: "3 days ago", imageName: "manoj-avatar"),
        PlantData(name: "Mango", health: "Thriving", lastWatered: "3 days ago", imageName: "manoj-avatar"),
        PlantData(name: "Croissant", health: "Thriving", lastWatered: "3 days ago", imageName: "manoj-avatar"),
    ]
    
    var body: some View {
        VStack(alignment: .leading) {
            HStack {
                Text("My Plants")
                    .padding(.leading)
                    .foregroundColor(.white) // Set title color to black
                    .font(Font.custom("PublicSans-SemiBold", size: 18))
                Spacer()
                Button(action: {
                    // Action to add another plant
                }) {
                    Image(systemName: "plus.circle")
                        .font(.title)
                        .padding(.trailing)
                        .foregroundColor(.black) // Set button icon color to black
                }
            }
            
            ScrollView(.horizontal, showsIndicators: false) {
                HStack(spacing: 15) {
                    ForEach(plants) { plant in
                        VStack {
                            Image(plant.imageName)
                                .resizable()
                                .scaledToFit()
                                .frame(width: 80, height: 80)
                                .clipShape(Circle())
                            Text(plant.name)
                                .font(Font.custom("PublicSans", size: 16))
                                .foregroundColor(.black)
                            Text("Health: \(plant.health)")
                                .font(Font.custom("PublicSans", size: 14))
                                .foregroundColor(.black)
                            Text("Last Watered: \(plant.lastWatered)")
                                .font(Font.custom("PublicSans", size: 14))
                                .font(.subheadline)
                                .foregroundColor(.black)
                        }
                        .padding()
                        .background(Color.white)
                        .cornerRadius(10)
                        .shadow(radius: 2)
                    }
                }
                .padding(.horizontal)
            }
            .frame(height: 150)
        }
        .padding(.top)
    }
}

struct FishTankDataView: View {
    @State var tankData: [TankData] = [
        TankData(dataName: "Last Fed", value: "5 hrs", status: "Normal"),
        TankData(dataName: "Food Left", value: "2 days", status: "Low"),
        TankData(dataName: "pH Level", value: "7.2", status: "Balanced"),
        TankData(dataName: "Water Purity Level", value: "90%", status: "Good"),
        TankData(dataName: "Temperature", value: "25°C", status: "Optimal"),
        TankData(dataName: "Water Hardness", value: "10 dGH", status: "Good"),
    ]
    
    var body: some View {
        VStack {
            Text("Fish Tank Data")
                .font(Font.custom("PublicSans-SemiBold", size: 18))
                .padding(.top)
                .foregroundColor(.white)
            
            LazyVGrid(
                columns: [
                    GridItem(.flexible()),
                    GridItem(.flexible()),
                    GridItem(.flexible())
                ],
                spacing: 10
            ) {
                ForEach(tankData) { data in
                    VStack {
                        
                        Text(data.dataName)
                            .font(Font.custom("PublicSans", size: 14))
                            .foregroundColor(.black)
                            .multilineTextAlignment(.center)
                        Text(data.value)
                            .font(Font.custom("PublicSans", size: 20))
                            .bold()
                            .foregroundColor(.black)
                        Text(data.status)
                            .font(Font.custom("PublicSans", size: 12))
                            .foregroundColor(.black)
                    }
                    .padding()
                    .frame(maxWidth: .infinity)
                    .background(Color.white)
                    .cornerRadius(10)
                    .shadow(radius: 2)
                }
            }
            .padding(.horizontal)
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
            Text("Welcome Back")
                .foregroundStyle(.black)
                .font(Font.custom("PublicSans-SemiBold.ttf", size: 20))
            WelcomeView()
            
        }//end of VStack
        .searchable(text: $searchText, prompt: prompt)
        .frame(height: 200)
        .frame(maxWidth: .infinity)
        .background(Color("DashboardPrimary"))
        .cornerRadius(20)
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

struct WelcomeView: View {
    @State private var subMessage: String = ""
    
    // Array of humorous sub-messages
    let subMessages = [
        "Your fish are reporting all systems go… for now.",
        "Remember, happy plants = happy fish. No pressure!",
        "Today's forecast: 99% chance of fish watching you work.",
        "Your plants have reached 'thirsty influencer' status.",
        "Fish looking lively! Or… maybe that’s just their default look?",
        "Plants on duty. Fish on patrol. All under your command!",
        "Don’t worry, your plants won’t judge your hydration habits.",
        "Your tank’s pH balance is better than most people’s diets!",
        "Fish update: No plans to overthrow the tank… yet.",
        "Keeping plants and fish happy since… well, right now!",
        "Monitoring fish, plants, and… oh look, there’s you!",
        "The plants thank you for being their water source.",
        "Your tank is thriving! Just like your commitment to them.",
        "Great news! pH levels stable, fish morale high.",
        "Water purity check complete. Tank population is pleased.",
        "Fish report: All fins and tails accounted for.",
        "Your plants say, ‘Thanks for the H2O boost!’",
        "Tank update: Fish are thriving. Plants are fabulous.",
        "Current pH level: Better than your morning coffee.",
        "Tank status: Calm, cool, and swimming.",
        "Tank water quality: As pure as your love for aquaponics.",
        "Fish news: They still think you’re a hero!",
        "Today’s goal: Keep the pH balanced and the plants fed.",
        "Good news: No fish tantrums reported… yet.",
        "Your plants wanted a selfie. Sadly, they can’t hold a phone.",
        "Fish fact: They’re secretly judging your water quality skills.",
        "Plant health check: Looking leafy and lively!",
        "Feeding fish: Just one of your many talents.",
        "Fish were asking when you’d be back. No, really.",
        "Tank vibes: Peaceful, productive, and slightly fishy.",
        "Today’s pH level: Perfect. Just like you planned.",
        "Plant whisperer mode: Activated.",
        "Fish update: They’re swimming, and that’s all you need.",
        "Reminder: Fish thrive on compliments too.",
        "Tank condition: Top-notch. Fish-approved.",
        "Plant report: No complaints. Just vibes.",
        "Latest tank gossip: Fish don’t have much to say today.",
        "Fish reaction: They think you’re a tank magician.",
        "Your plants are thriving. The fish are thriving. Nice work!",
        "Warning: Fish might start giving you side-eye if they’re hungry.",
        "If plants could clap, yours would be cheering.",
        "Fish water quality: Olympic-level sparkling.",
        "Plant health report: Still green and fabulous.",
        "Fish talk: ‘Do we get extra snacks today?’",
        "Today’s agenda: Hydrate, feed, and rule the tank.",
        "You’re the best thing to happen to this tank.",
        "Fish’s only complaint: None. They’re fish.",
        "Tank trivia: You’ve officially outsmarted algae!",
        "Your plants think you’re the world’s best hydration expert.",
        "Fish health: Swimmingly good. Plant health: Blooming.",
        "Your tank is thriving under your watchful eye.",
        "Fish update: They’re chill. You’re doing great.",
        "Plant status: Lush and loving life.",
        "Tank vibes: Thanks to you, they’re impeccable."
    ]
    
    var body: some View {
        Text(subMessage)
            .font(Font.custom("PublicSans-ExtraLight", size: 22))
            .foregroundStyle(.black)
            .multilineTextAlignment(.center)
            .onAppear {
                subMessage = subMessages.randomElement() ?? "Welcome to your aquaponics app!"
            }
        
    }
}

#Preview {
    NavigationStack {
        HomeView()
            .environmentObject(UserModel())
    }
}
