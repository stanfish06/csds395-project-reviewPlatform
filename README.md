# csds395-project-reviewPlatform
This repository is built for the final project of CSDS395: Senior Project in Computer Science at Case Western Reserve University. It contains an online Yelp-like reviewing platform.

The folder in this repository are:
- *docs* - Documents and Figures for the Web-App
- **To Be Updated**. 
## Presentation + demo video
Video can be found [here](https://drive.google.com/file/d/1uKYoNYY1QsoNdFvfpfgGA9MDzGOVXE0E/view?usp=share_link).

## Instruction for Running Locally
### Installing 
1. git clone the project
2. Enter the my_app folder
3. npm install next
4. npm install prisma --save-dev
5. npm install cypress
### Running app
npm run dev
### Running cypress test (testing requires the application in running)
- In one shell, enter npm run dev
- In the other shell, enter npx cypress open
- Note: please do not use the app in the browser while the test is running
- If for some reasons, testing fails to run, please look at testing-result.png under csds395-project-reviewPlatform
