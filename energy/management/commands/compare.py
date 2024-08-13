from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.common.keys import Keys
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
import pandas as pd
import time

# Initialize the Chrome driver
driver = webdriver.Chrome()  # Ensure chromedriver is in your PATH

# Define URLs and credentials
login_url = "https://energy-1.onrender.com/signin"
users_url = "https://energy-1.onrender.com/users"
national_id = "444"
password = "444"

# Function to log in to the website
def login():
    driver.get(login_url)
    WebDriverWait(driver, 10).until(EC.presence_of_element_located((By.NAME, 'national_id')))
    
    national_id_input = driver.find_element(By.NAME, 'national_id')
    password_input = driver.find_element(By.NAME, 'password')
    
    national_id_input.send_keys(national_id)
    password_input.send_keys(password)
    
    password_input.send_keys(Keys.RETURN)

# Function to scrape user information
def scrape_users():
    WebDriverWait(driver, 10).until(EC.url_to_be(users_url))
    driver.get(users_url)
    
    # Wait for the user data to load
    WebDriverWait(driver, 10).until(EC.presence_of_element_located((By.TAG_NAME, 'table')))
    
    # Extract the table data
    table = driver.find_element(By.TAG_NAME, 'table')
    rows = table.find_elements(By.TAG_NAME, 'tr')
    
    data = []
    for row in rows:
        cols = row.find_elements(By.TAG_NAME, 'td')
        if cols:
            data.append([col.text for col in cols])
    
    return data

# Log in to the website
login()

# Scrape user information
user_data = scrape_users()

# Close the browser
driver.quit()

# Convert scraped data to a pandas DataFrame
columns = ['Column1', 'Column2', 'Column3', 'Column4']  # Replace with actual column names
users_df = pd.DataFrame(user_data, columns=columns)

# Save DataFrame to an Excel file
excel_file = "users_information.xlsx"
users_df.to_excel(excel_file, index=False)

print(f"User information has been saved to {excel_file}")
