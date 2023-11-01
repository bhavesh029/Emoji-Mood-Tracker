# emojiTracker Milkyway BE Test Guide

## Generate access token for testing
After composing docker, run
```
npx ts-node .\scripts\iam-handler\generate-emoji-tracker-test-token.ts
```
emojiTracker BE code support mocking desired output, success or fail, fail with different error codes on the basis of input supplied.

## Follow the following inputs to get the specified output:

### API `/phone-no/validate/otp`
### Details 
    Onboarding Role
    Phone No.: 1000000000
    OTP: 1123
    ---

    Owner Role
    Phone No.: 1111111111
    OTP:3211
---
<br></br>
### API `/aadhaar/otp`
### Details 
    Input: {"aadhaarNumber": "[any 8 digit][0200]"}
    Output: Success
    ---

    Input: {"aadhaarNumber": "[any 8 digit][1095]"}
    Output: Failure | msg - Invalid Aadhaar Number
---
<br></br>
### API `/aadhaar/verify`
### Details 
    Input: {"otpTransactionId": "*",  "otp": "200"}
    Output: Success
    ---

    Input: {"otpTransactionId": "*",  "otp": "1026"}
    Output: Failure | msg - Wrong Otp Entered
    ---

    Input: {"otpTransactionId": "*",  "otp": "1045"}
    Output: Failure | msg - Invalid otpTransactionId
    ---

    Input: {"otpTransactionId": "*",  "otp": "5000"}
    Output: Failure | msg - nid-photo-does-not-match
    ---

    Input: {"otpTransactionId": "*",  "otp": "5001"}
    Output: Failure | msg - nid-name-does-not-match
    ---

    Input: {"otpTransactionId": "*",  "otp": "5002"}
    Output: Failure | msg - nid-dob-does-not-match

---
<br></br>
### API `/driving-licence/validate`
### Details 
    Input: {"drivingLicense":"[any 11 digit in DL format][0200]"}
    Output: Success
    ---

    Input: {"drivingLicense":"[any 11 digit in DL format][1092]"}
    Output: Failure | msg - Please enter valid DL Number
    ---

    Input: {"drivingLicense":"[any 11 digit in DL format][5000]"}
    Output: Failure | msg - nid-photo-does-not-match
    ---

    Input: {"drivingLicense":"[any 11 digit in DL format][5001]"}
    Output: Failure | msg - nid-name-does-not-match
    ---

    Input: {"drivingLicense":"[any 11 digit in DL format][5002]"}
    Output: Failure | msg - nid-dob-does-not-match
