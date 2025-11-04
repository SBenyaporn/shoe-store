*** Variables ***
${BASE_URL}         http://localhost:5173
${BROWSER}          chrome
${TIMEOUT}          10s
${DELAY}            0.3s
${SHORT_TIMEOUT}    5s
${LONG_TIMEOUT}     15s

# User Credentials
${VALID_EMAIL}      test@example.com
${VALID_PASSWORD}   password123
${VALID_FULL_NAME}  Test User
${VALID_PHONE}      0812345678

# Invalid Credentials
${INVALID_EMAIL}    invalid-email
${INVALID_PASSWORD} 12345

# Navigation Links
${HOME_LINK}        /
${SHOP_LINK}        /shop
${FAVORITES_LINK}   /favorites
${CART_LINK}        /cart
${LOGIN_LINK}       /login
${REGISTER_LINK}    /register

# Product IDs
${PRODUCT_ID_1}     puma-og
${PRODUCT_ID_2}     puma-palermo-1
${PRODUCT_ID_3}     nike-court

# Test Data
${TEST_SIZE}        38
${SHIPPING_NAME}    John Doe
${SHIPPING_ADDRESS} 123 Test Street
${SHIPPING_DISTRICT} Test District
${SHIPPING_PROVINCE} Bangkok
${SHIPPING_ZIPCODE} 10110
${SHIPPING_PHONE}   0812345678

