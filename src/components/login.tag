login
    .valign-wrapper(style='{styles}')
            form.col.s12(style='width: 300px',  onsubmit='{ submit }')
                .row
                    .input-field.col.s12
                        input#email.validate(type='text', ref='email')
                        label(for='email') Email
                .row
                    .input-field.col.s12
                        input#password.validate(type='password', ref='password')
                        label(for='password') Password
                button.btn.waves-effect.waves-light(type='submit', name='action')
                    | Submit
                    i.material-icons.right send
    script(type='text/coffeescript').
        console.log "logging in"
        @styles = {"justify\-content": "center", height: "100vh"}
        @submit = (e) =>
            wpapi = require 'wpapi'
            e.preventDefault()
            user_email = @refs.email.value
            password = @refs.password.value
            window.wp = new wpapi
                endpoint: 'https://scriptbloqs.com/wp-json'
                username: user_email
                password: password
                auth: true
            console.log wp
            # $.ajax({
            #     url: 'https://scriptbloqs.com/wp-json/jwt-auth/v1/token',
            #     type: 'POST',
            #     data: JSON.stringify({password: password, username: user_email,})
            #     timeout: 2000
            # }).then((data)=>
            #     localStorage.setItem("token", data.token)
            #     localStorage.setItem("user", JSON.stringify({user_email: data.user_email, user_nicename: data.user_nicename,
            #     user_display_name: data.user_display_name}))
            #     @parent.auth = true
            #     @parent.update()
            # ,()=>
            #     @parent.auth = false
            #     @parent.update()
            # )
            # password = @refs.password.value
            # $.ajax({
            #     url: 'https://scriptbloqs.com/wp-json/jwt-auth/v1/token',
            #     type: 'POST',
            #     data: JSON.stringify({password: password, username: user_email,})
            #     timeout: 2000
            # }).then((data)=>
            #     localStorage.setItem("token", data.token)
            #     localStorage.setItem("user", JSON.stringify({user_email: data.user_email, user_nicename: data.user_nicename,
            #     user_display_name: data.user_display_name}))
            #     @parent.auth = true
            #     @parent.update()
            # ,()=>
            #     @parent.auth = false
            #     @parent.update()
            # )

