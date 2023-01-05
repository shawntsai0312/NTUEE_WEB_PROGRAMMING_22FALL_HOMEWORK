import UserModel from "../models/user";
import bcrypt from "bcrypt";

const Mutation = {
    logIn: async (parent, { input }, { pubSub }) => {
        console.log(input);
        const user = await UserModel.findOne({ email: input.email.toLowerCase() });
        if (!user) {
            // throw new Error("No user found")
            return { message: "No user found" }
        }
        const isValid = await bcrypt.compare(input.password, user.password);
        if (!isValid) {
            // throw new Error("Incorrect password")
            return { message: "Incorrect password" }
        }
        if (user && isValid) {
            return { message: "correct", name: user.name }
        }
    },
    createUser: async (parent, { input }, { pubSub }) => {
        // console.log(input);
        let user = await UserModel.findOne({ email: input.email.toLowerCase() });
        if (!user) {
            let newUser = new UserModel(input)
            // console.log(newUser)
            newUser.email = input.email.toLowerCase()
            newUser.password = await bcrypt.hash(input.password, 12)
            newUser.save();
            return "sign up successfully"
        } else {
            console.log("user exist")
            console.log(user);
            return "user exist"
        }
    },
    createMerchandise: async (parent, { input }, { pubSub }) => {
        console.log("createMerchandise")
        let user = await UserModel.findOne({ email: input.email.toLowerCase() });
        let newMer = { id: input.id, name: input.name, isFavorite: input.isFavorite, items: [] }
        user.merchandise.push(newMer);
        user.save()
        pubSub.publish('USER_UPDATED', {
            user: user
        })
    },
    createItem: async (parent, { input }, { pubSub }) => {
        console.log("createItem")
        let user = await UserModel.findOne({ email: input.email.toLowerCase() });
        let newUser = user
        let newItem = { link: input.link, description: input.description, id: input.id }
        let index = user.merchandise.findIndex(e => e.id === input.merchandiseId)
        let newMerArr = user.merchandise
        newMerArr[index].items.push(newItem);
        newUser.merchandise = newMerArr
        UserModel.findOneAndUpdate({ email: input.email.toLowerCase() }, { merchandise: newMerArr })
            .exec((err, data) => {
                if (err) console.log(err);
                else console.log(data)
            })
        pubSub.publish('USER_UPDATED', {
            user: user
        })
    },
    updateUserName: async (parent, { input }, { pubSub }) => {
        let user = await UserModel.findOne({ email: input.email.toLowerCase() });
        user.name = input.name;
        user.save();
        pubSub.publish('USER_UPDATED', {
            user: user
        })
    },
    updateMerchandise: async (parent, { input }, { pubSub }) => {
        let user = await UserModel.findOne({ email: input.email.toLowerCase() });
        let index = user.merchandise.findIndex(e => e.id === input.id)
        // console.log(user.merchandise)
        let newMer = user.merchandise;
        // console.log(newMer[index])
        newMer[index].name = input.name;
        newMer[index].isFavorite = input.isFavorite;
        let newUser = user
        newUser.merchandise = newMer
        // console.log(newMer[index])
        // console.log(newMer)
        UserModel.findOneAndUpdate({ email: input.email }, { merchandise: newMer })
            .exec((err, data) => {
                if (err) console.log(err);
                else console.log(data);
            })
        pubSub.publish('USER_UPDATED', {
            user: newUser
        })
    },
    updateItem: async (parent, { input }, { pubSub }) => {
        let user = await UserModel.findOne({ email: input.email.toLowerCase() });
        let merIndex = user.merchandise.findIndex(e => e.id === input.merchandiseId);
        let newMer = user.merchandise;
        let itemIndex = newMer[merIndex].items.findIndex(e => e.id === input.id)
        newMer[merIndex].items[itemIndex].link = input.link;
        newMer[merIndex].items[itemIndex].description = input.description;
        // console.log(newMer[merIndex].items[itemIndex]);
        let newUser = user
        newUser.merchandise = newMer
        UserModel.findOneAndUpdate({ email: input.email.toLowerCase() }, { merchandise: newMer })
            .exec((err, data) => {
                if (err) console.log(err);
                else console.log(data);
            })
        pubSub.publish('USER_UPDATED', {
            user: newUser
        })
    },
    updateFollowing: async (parent, { input }, { pubSub }) => {
        console.log("update following")
        console.log(input)
        let me = await UserModel.findOne({ email: input.myEmail.toLowerCase() });
        let friend = await UserModel.findOne({ email: input.email.toLowerCase() });
        let newMe = me
        let fol = me.following;
        fol.push({ name: friend.name, email: friend.email.toLowerCase() })
        // console.log(fol);
        me.following = fol
        UserModel.findOneAndUpdate({ email: me.email.toLowerCase() }, { following: fol })
            .exec((err, data) => {
                if (err) console.log(err);
                else console.log(data);
            })
        pubSub.publish('USER_UPDATED', {
            user: newMe
        })
    },
    deleteMerchandise: async (parent, { input }, { pubSub }) => {
        console.log("delete merchandise")
        let user = await UserModel.findOne({ email: input.email.toLowerCase() });
        let mer = user.merchandise;
        // let index = mer.findIndex(e => e.id === input.id)
        let newMer = mer.filter(e => e.id !== input.id)
        console.log(newMer)
        let newUser = user
        newUser.merchandise = newMer
        UserModel.findOneAndUpdate({ email: input.email.toLowerCase() }, { merchandise: newMer })
            .exec((err, data) => {
                if (err) console.log(err);
                else console.log(data);
            })
        pubSub.publish('USER_UPDATED', {
            user: newUser
        })
    },
    deleteItem: async (parent, { input }, { pubSub }) => {
        let user = await UserModel.findOne({ email: input.email.toLowerCase() });
        let newMer = user.merchandise;
        let merIndex = user.merchandise.findIndex(e => e.id === input.merchandiseId);
        // let itemIndex = user.merchandise[merIndex].items.findIndex(e => e.id === input.id)
        // let deletedItem = newMer[merIndex].items[itemIndex]
        let newItems = newMer[merIndex].items.filter(e => e.id !== input.id)
        newMer[merIndex].items = newItems;
        let newUser = user
        newUser.merchandise = newMer
        UserModel.findOneAndUpdate({ email: input.email.toLowerCase() }, { merchandise: newMer })
            .exec((err, data) => {
                if (err) console.log(err);
                else console.log(data);
            })
        pubSub.publish('USER_UPDATED', {
            user: newUser
        })
    },
    deleteFollowing: async (parent, { input }, { pubSub }) => {
        console.log("delete following")
        let me = await UserModel.findOne({ email: input.myEmail.toLowerCase() });
        let fol = me.following;
        // console.log(fol)
        let newFol = fol.filter(e => e.email.toLowerCase() !== input.email.toLowerCase())
        // console.log(newFol)
        let newMe = me
        newMe.following = newFol
        UserModel.findOneAndUpdate({ email: me.email.toLowerCase() }, { following: newFol })
            .exec((err, data) => {
                // if (err) console.log(err);
                // else console.log(data);
            })
        pubSub.publish('USER_UPDATED', {
            user: newMe
        })
    }
}

export default Mutation;