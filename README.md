
 

# Get Started:
    
1. Create a private folder at the same directory level as the repo (outside the repo)

   ```
   /private  
   /hologram  
      - /app  
      - /public  
      - /server 
   ```
     
2. Create your .env file within the private directory and include 
  - `PORT=` optional,
  - `MONGO_URL=` for your DB connection, 
  - `SECRET_STR=` for your JWT (server/services/passport) 
  - `SPARKPOST_KEY=` for sparkpost (server/services/sparkpost)
    
For example(../private/.env):  
 
    
    PORT=3000
    MONGO_URL=mongodb://localhost:27017/mydb
    SECRET_STR=password
    SPARKPOST_KEY=7d76d21c0e90148c9b0b1bf4601ae0dc409c69d0
    
    


