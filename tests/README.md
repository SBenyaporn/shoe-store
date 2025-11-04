# Robot Framework Test Suite for ShoeStore

Test automation suite for the ShoeStore application using Robot Framework.

## Setup

### Prerequisites
- Python 3.8 or higher
- Chrome browser installed
- ChromeDriver (automatically managed by webdrivermanager)

### Installation

1. Install dependencies:
```bash
pip install -r requirements.txt
```

2. Ensure the application is running:
```bash
cd my-app
npm run dev
```

The application should be running at `http://localhost:5173`

## Test Structure

```
tests/
├── resources/
│   ├── Variables.robot       # Test variables and constants
│   └── Keywords.robot        # Reusable keywords
├── test_suites/
│   ├── 01_navigation.robot   # Navigation tests
│   ├── 02_shop.robot         # Shop page tests
│   ├── 03_product_detail.robot  # Product detail page tests
│   ├── 04_cart.robot         # Shopping cart tests
│   ├── 05_checkout.robot     # Checkout process tests
│   ├── 06_payment.robot      # Payment page tests
│   ├── 07_auth.robot         # Authentication tests
│   └── 08_favorites.robot    # Favorites functionality tests
├── requirements.txt          # Python dependencies
└── README.md                # This file
```

## Running Tests

### Run all tests:
```bash
robot tests/test_suites/
```

### Run a specific test suite:
```bash
robot tests/test_suites/01_navigation.robot
```

### Run tests with tags:
```bash
robot --include smoke tests/test_suites/
```

### Run tests with specific browser:
```bash
robot --variable BROWSER:firefox tests/test_suites/
```

### Generate reports:
```bash
robot --outputdir results tests/test_suites/
```

## Test Coverage

### Navigation Tests
- Page navigation
- Navbar visibility
- Back button functionality

### Shop Tests
- Product display
- Search functionality
- Product filtering
- Add to favorites from shop

### Product Detail Tests
- Product information display
- Size selection
- Add to cart
- Add to favorites
- Image navigation
- Sold out handling

### Cart Tests
- Add/remove products
- Quantity management
- Price calculation
- Size display
- Empty cart handling

### Checkout Tests
- Shipping information form
- Order summary
- Total calculation
- Navigation to payment

### Payment Tests
- Payment method selection
- Card information form
- Payment processing

### Authentication Tests
- Login functionality
- Registration
- Form validation
- Logout

### Favorites Tests
- Add/remove favorites
- Size selection
- Add to cart from favorites
- Product information display

## Configuration

### Update Base URL
Edit `tests/resources/Variables.robot`:
```robot
${BASE_URL}    http://localhost:5173
```

### Update Browser
```robot
${BROWSER}    chrome  # or firefox, edge, safari
```

### Update Timeouts
```robot
${TIMEOUT}    10s
${DELAY}      0.5s
```

## Notes

- Some tests may require backend API to be running
- Payment tests may need mock backend responses
- Adjust selectors based on actual implementation
- Update test data (emails, product IDs) as needed

## Troubleshooting

### ChromeDriver issues:
```bash
pip install --upgrade selenium webdrivermanager
```

### Browser not found:
Ensure Chrome/Firefox is installed and in PATH

### Timeout issues:
Increase `${TIMEOUT}` value in Variables.robot

### Element not found:
Check if selectors match actual HTML structure
Use browser developer tools to verify element locators



