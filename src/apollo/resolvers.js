import { 
    insertUserData,
    getUserData
} from '../libs/userdata'

export const resolvers = {
    Query: {
        async viewer(_parent, args, context, _info) {
            const mintUsers = await getUserData(args.input.walletAddress);
            return { mintUsers };
        },
    },
    Mutation: {
        async insertUserData(_parent, args, _context, _info) {
            const mintUser = await insertUserData(args.input.mintToken, args.input.firstName, args.input.lastName, args.input.walletAddress, args.input.country, args.input.city, args.input.province, args.input.postalCode, args.input.clothingSize);
            return { mintUser };
        },
        async getUserData(_parent, args, _context, _info) {
            const mintUsers = await getUserData(args.input.walletAddress);
            return { mintUsers };
        },
    },
};
