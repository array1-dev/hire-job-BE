const axios = require('axios')
// const templateEmail = import('./templateSendEmail.html')

module.exports = {
    SendEmail: (email, code) => {
        return new Promise((resolve, reject) => {
            const url = `${process.env.LINK_VERIFY}?email=${email}&code=${code}`
            axios({
                method: 'POST',
                url: 'https://api.sendinblue.com/v3/smtp/email',
                headers: {
                    'Content-Type': 'application/json',
                    'accept': 'application/json',
                    'api-key': process.env.API_KEY_SENDINBLUE
                },
                data: JSON.stringify({
                    "sender": {
                        "email": `${process.env.EMAIL_SENDER}`,
                    },
                    "to": [
                        {
                            "email": `${email}`,
                        }
                    ],
                    "subject": "Verify your account!",
                    "textContent": `Click link to verify your account:<a href="${url}">here!</a>`
                })
            })
                .then(result => resolve(true))
                .catch(err => reject(err))
        })
    },
    forgotPass: (email, code) => {
        return new Promise((resolve, reject) => {
            const url = `${process.env.LINK_VERIFY}/change-password?email=${email}&code=${code}`
            axios({
                method: 'POST',
                url: 'https://api.sendinblue.com/v3/smtp/email',
                headers: {
                    'Content-Type': 'application/json',
                    'accept': 'application/json',
                    'api-key': process.env.API_KEY_SENDINBLUE
                },
                data: JSON.stringify({
                    "sender": {
                        "email": `${process.env.EMAIL_SENDER}`,
                    },
                    "to": [
                        {
                            "email": `${email}`,
                        }
                    ],
                    "subject": "Reset your password!",
                    "htmlContent": `Click link to reset your password:<a href="${url}">here!</a>`
                })
            })
                .then(result => resolve(true))
                .catch(err => reject(false))
        })
    }
}