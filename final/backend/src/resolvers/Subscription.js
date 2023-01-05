const Subscription = {
    user: {
        subscribe: (parent, { input }, { pubSub }) => {
            return pubSub.subscribe('USER_UPDATED')
        }
    },
}

export default Subscription;