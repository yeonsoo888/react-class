export const setMembers = member => {
    return {
        type: "SET_MEMBERS",
        payload: member,
    }
}

export const upLike = (member) => {
    return {
        type: "upLike",
        payload: member,
    }
}
