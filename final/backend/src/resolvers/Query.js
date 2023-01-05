import UserModel from "../models/user"

const Query = {
    user: async (parent, args) => {
        console.log('user query')
        console.log(args)
        const user = await UserModel.findOne({ email: args.email.toLowerCase() });
        console.log(user)
        return user;
    },
    usersSearch: async (parent, args) => {
        console.log("find all users")
        const { emailSearchedText } = args;
        const users = await UserModel.find({});
        let filterUsers = []
        // console.log(emailSearchedText.toLowerCase())
        if (emailSearchedText !== '') {
            for (let i = 0; i < users.length; i++) {
                if (users[i].email.indexOf(emailSearchedText.toLowerCase(), 0) === 0) {
                    filterUsers.push(users[i])
                }
            }
            for (let j = 0; j < filterUsers.length; j++) console.log(filterUsers[j].email)
        } else {
            filterUsers = []
        }
        console.log(filterUsers.map(e => e.email))
        return filterUsers;
    },
}

export default Query;