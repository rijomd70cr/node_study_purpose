const { requestModel } = require("../Model/requestModal");

const getMyRequest = async (query) => {
    try {
        const fields = { email: 1, name: 1, mobileNo: 1, _id: 1, friendsData: 1 }
        const request = await requestModel.aggregate([
            {
                $match: query
            },
            {
                $lookup: {
                    from: 'users', // The name of the collection (usually plural) where User documents are stored
                    localField: 'senderID',
                    foreignField: '_id',
                    as: 'friendsData' // This will contain the data of friends
                }
            },
            { $project: fields },
            // {
            //     $addFields: {
            //         friendsCount: { $size: '$friends' },
            //         // friends: { $map: { input: '$friendsData', as: 'friend', in: { _id: '$$friend._id', name: '$$friend.name' } } }
            //     }
            // }
        ])

        // const request = await requestModel.find(query).lean().populate('senderID', 'name email mobileNo');
        console.log(request, "request");
        return request;
    } catch (error) {
        throw new Error(error);
    }
}

module.exports = { getMyRequest }