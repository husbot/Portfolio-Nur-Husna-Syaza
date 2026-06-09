//Electronic Device Preorder System

#include <iostream>
#include <fstream>
#include <string>
#include <vector>
#include <limits> // For std::numeric_limits
using namespace std;

// Structs for different device categories
struct Computing {
    string name;
    string display;
    string processor;
    int ram; // in GB
    string storage;
    double price; // in MYR
    string releaseDate;
    string description;
    string warranty;
    string accessories;
};

struct Communication {
    string name;
    string display;
    string processor;
    int ram; // in GB
    string storage;
    double price; // in MYR
    string releaseDate;
    string description;
    string warranty;
    string accessories;
};

struct Household {
    string name;
    string type;
    double capacity; // in Liters
    string features;
    double price; // in MYR
    string releaseDate;
    string description;
    string warranty;
    string accessories;
};

struct Imaging {
    string name;
    string type;
    string resolution;
    double price; // in MYR
    string releaseDate;
    string description;
    string warranty;
    string accessories;
};

struct Healthcare {
    string name;
    string type;
    string features;
    double price; // in MYR
    string releaseDate;
    string description;
    string warranty;
    string accessories;
};

void displayCategories() {
    cout << "Device Categories:\n";
    cout << "1. Computing Devices\n";
    cout << "2. Communication Devices\n";
    cout << "3. Household Appliances\n";
    cout << "4. Photography and Imaging Devices\n";
    cout << "5. Healthcare Devices\n\n";
}

void displayPriceRanges() {
    cout << "Price Ranges (in MYR):\n";
    cout << "1. < 1500\n";
    cout << "2. 1500 - 5000\n";
    cout << "3. > 5000\n\n";
}

void saveOrderDetails(const string& name, const string& email, const string& address, const string& paymentMethod, const string& deviceName, double devicePrice) {
    ofstream orderFile("order_receipt.txt"); // Append to the file
    if (orderFile.is_open()) {
        orderFile << "Name: " << name << endl;
        orderFile << "Email: " << email << endl;
        orderFile << "Shipping Address: " << address << endl;
        orderFile << "Payment Method: " << paymentMethod << endl;
        orderFile << "\nDevice Details:\n";
        orderFile << "Device Name: " << deviceName << endl;
        orderFile << "Device Price: " << devicePrice << " MYR\n";
        orderFile << "---------------------------------------\n";
        cout << "Order details saved to 'order_receipt.txt'.\n";
        orderFile.close();
    } else {
        cout << "Unable to open file to save order details.\n";
    }
}

bool verifyOrderDetails(const string& name, const string& email, const string& address, const string& paymentMethod) {
    cout << "\nPlease verify your order details:\n";
    cout << "Name: " << name << "\n";
    cout << "Email: " << email << "\n";
    cout << "Shipping Address: " << address << "\n";
    cout << "Payment Method: " << paymentMethod << "\n";
    cout << "Are these details correct? (y/n): ";
    char confirmation;
    cin >> confirmation;
    return (confirmation == 'y' || confirmation == 'Y');
}

void displayComputing(const Computing &comp) {
    cout << "Name: " << comp.name << endl;
    cout << "Display: " << comp.display << endl;
    cout << "Processor: " << comp.processor << endl;
    cout << "RAM: " << comp.ram << "GB" << endl;
    cout << "Storage: " << comp.storage << endl;
    cout << "Price: " << comp.price << " MYR" << endl;
    cout << "Release Date: " << comp.releaseDate << endl;
    cout << "Description: " << comp.description << endl;
    cout << "Warranty: " << comp.warranty << endl;
    cout << "Accessories: " << comp.accessories << endl;
    cout << "------------------------" << endl;
}

void displayCommunication(const Communication &comm) {
    cout << "Name: " << comm.name << endl;
    cout << "Display: " << comm.display << endl;
    cout << "Processor: " << comm.processor << endl;
    cout << "RAM: " << comm.ram << "GB" << endl;
    cout << "Storage: " << comm.storage << endl;
    cout << "Price: " << comm.price << " MYR" << endl;
    cout << "Release Date: " << comm.releaseDate << endl;
    cout << "Description: " << comm.description << endl;
    cout << "Warranty: " << comm.warranty << endl;
    cout << "Accessories: " << comm.accessories << endl;
    cout << "------------------------" << endl;
}

void displayHousehold(const Household &house) {
    cout << "Name: " << house.name << endl;
    cout << "Type: " << house.type << endl;
    cout << "Capacity: " << house.capacity << "Liters" << endl;
    cout << "Features: " << house.features << endl;
    cout << "Price: " << house.price << " MYR" << endl;
    cout << "Release Date: " << house.releaseDate << endl;
    cout << "Description: " << house.description << endl;
    cout << "Warranty: " << house.warranty << endl;
    cout << "Accessories: " << house.accessories << endl;
    cout << "------------------------" << endl;
}

void displayImaging(const Imaging &img) {
    cout << "Name: " << img.name << endl;
    cout << "Type: " << img.type << endl;
    cout << "Resolution: " << img.resolution << endl;
    cout << "Price: " << img.price << " MYR" << endl;
    cout << "Release Date: " << img.releaseDate << endl;
    cout << "Description: " << img.description << endl;
    cout << "Warranty: " << img.warranty << endl;
    cout << "Accessories: " << img.accessories << endl;
    cout << "------------------------" << endl;
}

void displayHealthcare(const Healthcare &health) {
    cout << "Name: " << health.name << endl;
    cout << "Type: " << health.type << endl;
    cout << "Features: " << health.features << endl;
    cout << "Price: " << health.price << " MYR" << endl;
    cout << "Release Date: " << health.releaseDate << endl;
    cout << "Description: " << health.description << endl;
    cout << "Warranty: " << health.warranty << endl;
    cout << "Accessories: " << health.accessories << endl;
    cout << "------------------------" << endl;
}


int main() {
    cout << "\tWelcome to TechPresto\n"<<"Your Future Devices, Just a Click Away\n\n";
    
    displayCategories();
    int category;
    cout << "Select a category (1-5): ";
    cin >> category;
    
/*    if (category < 1 || category > 5) {
        cout << "Invalid category selected! Please choose between 1 and 5.\n";
        return 1;
    }    */
    
    // Validate category selection
    while (cin.fail() || category < 1 || category > 5) {
        cin.clear(); // Clear the error state
        cin.ignore(numeric_limits<streamsize>::max(), '\n'); // Ignore invalid input
        cout << "Invalid category selected! Please choose between 1-5: ";
        cin >> category;
    }

    
    displayPriceRanges();
    int priceRange;
    cout << "Select a price range (1-3): ";
    cin >> priceRange;
    
/*    if (priceRange < 1 || priceRange > 3) {
        cout << "Invalid price range selected! Please choose between 1 and 3.\n";
        return 1;
    }   */
    
    // Validate price range selection
    while (cin.fail() || priceRange < 1 || priceRange > 3) {
        cin.clear(); // Clear the error state
        cin.ignore(numeric_limits<streamsize>::max(), '\n'); // Ignore invalid input
        cout << "Invalid price range selected! Please choose between 1-3: ";
        cin >> priceRange;
    }
    
    // Display devices and validate device selection
    int deviceChoice;
    string selectedDeviceName;
    double selectedDevicePrice;
    
    if (category == 1) { // Computing Devices
        vector<Computing> devices;

        if (priceRange == 1) {
            devices = {
                {"ASUS VivoBook 12", "11.6-inch HD", "Intel Celeron N3350", 4, "64GB eMMC", 1200, "2023-05-01", "Affordable and compact laptop for basic tasks.", "1-year standard warranty", "Power adapter"},
                {"Lenovo IdeaPad 1", "14-inch HD", "AMD A6-9220e", 4, "64GB eMMC", 1400, "2023-07-10", "Lightweight laptop for everyday use.", "1-year standard warranty", "Protective sleeve"}
            };
        } else if (priceRange == 2) {
            devices = {
                {"Dell Inspiron 15 3000", "15.6-inch Full HD", "Intel Core i3 11th Gen", 8, "256GB SSD", 2800, "2024-02-15", "Reliable laptop for work and entertainment.", "1-year standard warranty", "External mouse, Laptop bag"},
                {"Acer Aspire 5", "15.6-inch Full HD", "AMD Ryzen 5 5500U", 8, "512GB SSD", 3500, "2023-11-20", "Budget-friendly performance laptop.", "1-year standard warranty", "USB-C charger"}
            };
        } else if (priceRange == 3) {
            devices = {
                {"Microsoft Surface Laptop Studio", "14.4-inch PixelSense Flow", "Intel Core i7 11th Gen", 16, "512GB SSD", 7800, "2023-09-05", "High-performance laptop for creators.", "2-year extended warranty", "Surface Pen, Carry case"},
                {"HP Spectre x360 16", "16-inch 4K OLED", "Intel Core i7 13th Gen", 16, "1TB SSD", 9000, "2024-03-10", "Premium 2-in-1 laptop with stunning display.", "2-year extended warranty", "Active pen, External USB-C hub"}
            };
        }

        cout << "\nAvailable Devices:\n";
        for (int i = 0; i < devices.size(); ++i) {
            cout << i + 1 << ".\n";
            displayComputing(devices[i]);
        }
        cout << "\nSelect a device to preorder (1-" << devices.size() << ") or 0 to exit: ";
        cin >> deviceChoice;
        
        if (deviceChoice == 0) {
            cout << "Exiting program...\n";
            return 0 ; // Exits the function (if not in main(), replace with appropriate handling)
        }
        
        // Validate device selection
        while (cin.fail() || deviceChoice < 0 || deviceChoice > devices.size()) {
            cin.clear();
            cin.ignore(numeric_limits<streamsize>::max(), '\n');
            cout << "Invalid selection! Please select a device between 1-" << devices.size() << " or 0 to exit: ";
            cin >> deviceChoice;
        }
        
        // Store selected device details for the receipt
        selectedDeviceName = devices[deviceChoice - 1].name;
        selectedDevicePrice = devices[deviceChoice - 1].price;

        cout << "You selected: " << selectedDeviceName << "\n";
        
    } else if (category == 2) { // Communication Devices
        vector<Communication> devices;

        if (priceRange == 1) {
            devices = {
                {"Xiaomi Redmi Note 11", "6.43-inch FHD+ AMOLED", "Snapdragon 680", 4, "64GB", 1000, "2023-06-10", "Affordable smartphone with high-resolution display.", "1-year standard warranty", "USB-C charger, Protective case"},
                {"Realme C33", "6.5-inch HD+", "Unisoc T612", 3, "32GB", 800, "2023-03-15", "Budget smartphone with excellent battery life.", "1-year standard warranty", "Screen protector, Charger"}
            };
        } else if (priceRange == 2) {
            devices = {
                {"Samsung Galaxy A54", "6.4-inch Super AMOLED", "Exynos 1380", 8, "128GB", 2200, "2024-01-05", "Mid-range phone with advanced camera capabilities.", "1-year standard warranty", "Fast charger, Silicon case"},
                {"OnePlus Nord CE 3 Lite", "6.72-inch FHD+ LCD", "Snapdragon 695", 8, "128GB", 1800, "2023-09-12", "Smooth-performing phone with 120Hz display.", "1-year standard warranty", "USB-C charger, Transparent case"}
            };
        } else if (priceRange == 3) {
            devices = {
                {"iPhone 15 Pro Max", "6.7-inch Super Retina XDR OLED", "A17 Pro", 8, "256GB", 6500, "2023-09-22", "Premium smartphone with top-notch performance.", "1-year standard warranty", "MagSafe charger, Screen protector"},
                {"Samsung Galaxy Z Fold5", "7.6-inch Foldable Dynamic AMOLED", "Snapdragon 8+ Gen 2", 12, "512GB", 8800, "2023-08-01", "Foldable phone with advanced multitasking capabilities.", "2-year extended warranty", "S Pen, Case"}
            };
        }

        cout << "\nAvailable Communication Devices:\n";
        for (int i = 0; i < devices.size(); ++i) {
            cout << i + 1 << ".\n";
            displayCommunication(devices[i]);
        }
        cout << "\nSelect a device to preorder (1-" << devices.size() << ") or 0 to exit: ";
        cin >> deviceChoice;
        
        if (deviceChoice == 0) {
            cout << "Exiting program...\n";
            return 0 ; // Exits the function (if not in main(), replace with appropriate handling)
        }
        
        while (cin.fail() || deviceChoice < 0 || deviceChoice > devices.size()) {
            cin.clear();
            cin.ignore(numeric_limits<streamsize>::max(), '\n');
            cout << "Invalid selection! Please select a device between 1-" << devices.size() << " or 0 to exit: ";
            cin >> deviceChoice;
        }
        
        // Store selected device details for the receipt
        selectedDeviceName = devices[deviceChoice - 1].name;
        selectedDevicePrice = devices[deviceChoice - 1].price;

        cout << "You selected: " << selectedDeviceName << "\n";
        
    } else if (category == 3) { // Household Appliances
        vector<Household> devices;

        if (priceRange == 1) {
            devices = {
                {"Sharp ESX710 Washing Machine", "Top Load", 7, "Quick wash, Eco mode", 1000, "2023-03-01", "Compact washing machine ideal for small households.", "1-year standard warranty", "Detergent dispenser"},
                {"Midea Air Fryer MF-TN35A", "Air Fryer", 3.5, "Adjustable temperature, Timer", 450, "2023-04-10", "Compact and efficient air fryer for quick meals.", "1-year standard warranty", "Fryer basket"}
            };
        } else if (priceRange == 2) {
            devices = {
                {"Samsung Smart Oven MC32K7055KT", "Microwave with Grill", 32, "Hot Blast™, Slim Fry™", 2000, "2024-01-20", "Versatile oven with multiple cooking options.", "1-year standard warranty", "Grill rack, Crusty plate"},
                {"Dyson Pure Cool Air Purifier TP04", "Tower Fan & Air Purifier", 0, "HEPA filter, Real-time air quality monitoring", 3500, "2023-08-15", "Efficient air purifier with cooling fan feature.", "2-year extended warranty", "Remote control"}
            };
        } else if (priceRange == 3) {
            devices = {
                {"LG Side by Side Refrigerator", "Refrigerator", 600, "Inverter compressor, Smart diagnosis", 4500, "2024-03-15", "Spacious refrigerator with energy efficiency.", "2-year extended warranty", "Ice tray"},
                {"Bosch Built-in Coffee Machine", "Coffee Maker", 0, "OneTouch function, Auto milk frother", 6000, "2023-10-05", "Premium coffee machine for coffee enthusiasts.", "2-year extended warranty", "Water filter"}
            };
        }

        cout << "\nAvailable Household Appliances:\n";
        for (int i = 0; i < devices.size(); ++i) {
            cout << i + 1 << ".\n";
            displayHousehold(devices[i]);
        }
        cout << "\nSelect a device to preorder (1-" << devices.size() << ") or 0 to exit: ";
        cin >> deviceChoice;
        
        if (deviceChoice == 0) {
            cout << "Exiting program...\n";
            return 0 ; // Exits the function (if not in main(), replace with appropriate handling)
        }
        
        while (cin.fail() || deviceChoice < 0 || deviceChoice > devices.size()) {
            cin.clear();
            cin.ignore(numeric_limits<streamsize>::max(), '\n');
            cout << "Invalid selection! Please select a device between 1-" << devices.size() << " or 0 to exit: ";
            cin >> deviceChoice;
        }
        
        // Store selected device details for the receipt
        selectedDeviceName = devices[deviceChoice - 1].name;
        selectedDevicePrice = devices[deviceChoice - 1].price;

        cout << "You selected: " << selectedDeviceName << "\n";
        
    } else if (category == 4) { // Imaging Devices
        vector<Imaging> devices;

        if (priceRange == 1) {
            devices = {
                {"Canon EOS 2000D", "DSLR Camera", "18 MP", 1500, "2023-05-01", "Entry-level DSLR for budding photographers.", "1-year standard warranty", "Camera bag"},
                {"Nikon Coolpix B500", "Point and Shoot Camera", "16 MP", 800, "2023-06-15", "User-friendly camera with zoom capabilities.", "1-year standard warranty", "Batteries"}
            };
        } else if (priceRange == 2) {
            devices = {
                {"Sony Alpha a6400", "Mirrorless Camera", "24.2 MP", 3500, "2023-11-20", "Compact mirrorless camera with fast autofocus.", "2-year extended warranty", "Lens kit"},
                {"Fujifilm X-T30", "Mirrorless Camera", "26.1 MP", 4500, "2023-01-10", "Versatile mirrorless camera for professional use.", "2-year extended warranty", "Tripod"}
            };
        } else if (priceRange == 3) {
            devices = {
                {"Canon EOS R5", "Mirrorless Camera", "45 MP", 10000, "2023-09-01", "Professional camera with 8K video recording.", "2-year extended warranty", "Camera bag, Lens"},
                {"Nikon Z9", "Mirrorless Camera", "45.7 MP", 12000, "2024-01-15", "Flagship camera with advanced features.", "2-year extended warranty", "Extra battery"}
            };
        }

        cout << "\nAvailable Imaging Devices:\n";
        for (int i = 0; i < devices.size(); ++i) {
            cout << i + 1 << ".\n";
            displayImaging(devices[i]);
        }
        cout << "\nSelect a device to preorder (1-" << devices.size() << ") or to 0 exit: ";
        cin >> deviceChoice;
        
        if (deviceChoice == 0) {
            cout << "Exiting program...\n";
            return 0 ; // Exits the function (if not in main(), replace with appropriate handling)
        }
        
        while (cin.fail() || deviceChoice < 0 || deviceChoice > devices.size()) {
            cin.clear();
            cin.ignore(numeric_limits<streamsize>::max(), '\n');
            cout << "Invalid selection! Please select a device between 1-" << devices.size() << " or 0 to exit: ";
            cin >> deviceChoice;
        }
        
        // Store selected device details for the receipt
        selectedDeviceName = devices[deviceChoice - 1].name;
        selectedDevicePrice = devices[deviceChoice - 1].price;

        cout << "You selected: " << selectedDeviceName << "\n";
        
    } else if (category == 5) { // Healthcare Devices
        vector<Healthcare> devices;

        if (priceRange == 1) {
            devices = {
                {"Xiaomi Mi Band 5", "Fitness Tracker", "Heart Rate Monitor, Sleep Tracking", 200, "2023-02-10", "Affordable fitness tracker with essential features.", "1-year standard warranty", "Charging cable"},
                {"Philips Sonicare ProtectiveClean 6100", "Electric Toothbrush", "Pressure Sensor, Smart Timer", 300, "2023-03-05", "Electric toothbrush for superior dental care.", "1-year standard warranty", "Travel case"}
            };
        } else if (priceRange == 2) {
            devices = {
                {"Fitbit Charge 5", "Fitness Tracker", "Built-in GPS, Stress Management", 900, "2023-08-15", "Advanced fitness tracker with health metrics.", "1-year standard warranty", "Charging cable"},
                {"Withings Body+ Smart Scale", "Smart Scale", "Body Composition, Bluetooth", 400, "2023-05-01", "Smart scale that syncs with your phone.", "1-year standard warranty", "User manual"}
            };
        } else if (priceRange == 3) {
            devices = {
                {"Apple Watch Series 8", "Smartwatch", "ECG, Blood Oxygen Monitoring", 1800, "2023-09-22", "Versatile smartwatch with health tracking.", "2-year extended warranty", "Sport band"},
                {"Oura Ring Generation 3", "Smart Ring", "Sleep Tracking, Activity Monitoring", 1000, "2024-03-10", "Compact ring for health insights.", "2-year extended warranty", "Charging dock"}
            };
        }

        cout << "\nAvailable Healthcare Devices:\n";
        for (int i = 0; i < devices.size(); ++i) {
            cout << i + 1 << ".\n";
            displayHealthcare(devices[i]);
        }
        cout << "\nSelect a device to preorder (1-" << devices.size() << ") or 0 to exit: ";
        cin >> deviceChoice;
        
        if (deviceChoice == 0) {
            cout << "Exiting program...\n";
            return 0 ; // Exits the function (if not in main(), replace with appropriate handling)
        }
        
        while (cin.fail() || deviceChoice < 0 || deviceChoice > devices.size()) {
            cin.clear();
            cin.ignore(numeric_limits<streamsize>::max(), '\n');
            cout << "Invalid selection! Please select a device between 1-" << devices.size() << " or 0 to exit: ";
            cin >> deviceChoice;
        }
        
        // Store selected device details for the receipt
        selectedDeviceName = devices[deviceChoice - 1].name;
        selectedDevicePrice = devices[deviceChoice - 1].price;

        cout << "You selected: " << selectedDeviceName << "\n";
    }
    
    // Order details
    string name, email, address, paymentMethod;

    while (true) { // Loop until valid input is received
        cout << "\nEnter your name: ";
        cin.ignore(); // Ignore any leftover newline character
        getline(cin, name);
        
        // Check for null input
        if (name.empty()) {
            cout << "Name cannot be empty. Please re-enter.\n";
            continue; // Prompt for name again
        }

        cout << "Enter your email: ";
        getline(cin, email);
        
        // Check for null input
        if (email.empty()) {
            cout << "Email cannot be empty. Please re-enter.\n";
            continue; // Prompt for email again
        }

        cout << "Enter your address: ";
        getline(cin, address);
        
        // Check for null input
        if (address.empty()) {
            cout << "Address cannot be empty. Please re-enter.\n";
            continue; // Prompt for address again
        }

        cout << "Enter payment method (credit/debit/paypal): ";
        getline(cin, paymentMethod);
        
        // Check for null input and specific values
        if (paymentMethod.empty() || 
            (paymentMethod != "credit" && paymentMethod != "debit" && paymentMethod != "paypal")) {
            cout << "Payment method must be 'credit', 'debit', or 'paypal'. Please re-enter.\n";
            continue; // Prompt for payment method again
        }

        // Verify and save order details
        if (verifyOrderDetails(name, email, address, paymentMethod)) {
            saveOrderDetails(name, email, address, paymentMethod, selectedDeviceName, selectedDevicePrice);
            cout << "Your order has been placed successfully!\n";
            break; // Exit the loop upon successful order placement
        } else {
            cout << "Order verification failed. Please re-enter your details.\n";
        }
    }

    char checkStatus;
    cout << "\nWould you like to check your preorder status? (y/n): ";
    cin >> checkStatus;

    if (checkStatus == 'y' || checkStatus == 'Y') {
        ifstream orderFile("order_receipt.txt");
        if (orderFile.is_open()) {
            string line;
            cout << "\nPreorder Status:\n";
            while (getline(orderFile, line)) {
                cout << line << endl;
            }
            cout << "\nThank you for preordering with TechPresto!\n";
            orderFile.close();
        } else {
            cout << "No preorder details found.\n";
        }
    } else {
        cout << "Thank you for preordering with TechPresto!\n";
    }
    
    return 0;
}