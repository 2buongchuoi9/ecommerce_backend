import passport from "passport"

import oauth2GG from "passport-google-oauth2"
import oauth2FB from "passport-facebook"
import shopModel from "../models/shop.model.js"
import { AuthType } from "../helpers/constans.js"

const GoogleStrategy = oauth2GG.Strategy
const FacebookStrategy = oauth2FB.Strategy

const { GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET, FACEBOOK_CLIENT_ID, FACEBOOK_CLIENT_SECRET } = process.env
console.log("GOOGLE_CLIENT_ID", GOOGLE_CLIENT_ID)

passport.use(
    new GoogleStrategy(
        {
            clientID: GOOGLE_CLIENT_ID,
            clientSecret: GOOGLE_CLIENT_SECRET,
            callbackURL: "/auth/google/callback",
            passReqToCallback: true,
            scope: ["email", "profile"],
        },
        async (request, accessToken, refreshToken, profile, done) => {
            console.log("profile", profile)

            const foundUser = await shopModel.findOne({ email: profile.emails[0].value })
            if (foundUser) return done(null, foundUser)

            const newUser = await shopModel.create({
                googleId: profile.id,
                authType: AuthType.GOOGLE,
                email: profile.emails[0].value,
                name: profile.family_name + " " + profile.given_name,
                verify: true,
            })

            return done(null, newUser)
        }
    )
)

passport.use(
    new FacebookStrategy(
        {
            clientID: FACEBOOK_CLIENT_ID,
            clientSecret: FACEBOOK_CLIENT_SECRET,
            callbackURL: "/auth/facebook/callback",
            profileFields: ["id", "displayName", "photos", "email"],
        },
        async (accessToken, refreshToken, profile, done) => {
            console.log("profile", profile)

            const foundUser = await shopModel.findOne({ email: profile.emails[0].value })
            if (foundUser) return done(null, foundUser)

            const newUser = await shopModel.create({
                facebookId: profile.id,
                authType: AuthType.FACEBOOK,
                email: profile.emails[0].value,
                name: profile.displayName,
                verify: true,
            })

            return done(null, newUser)
        }
    )
)

passport.serializeUser((user, done) => {
    return done(null, user)
})
passport.deserializeUser((user, done) => {
    return done(null, user)
})

export default passport
