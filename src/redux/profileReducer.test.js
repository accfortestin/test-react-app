import profileReducer, { addPost } from "./profileReducer";

test('length', () => {
    let action = addPost("blabla");
    let state = {
        postData: [
            {
                id: 1,
                message: "First Post",
                likeCounter: 0,
            },
            {
                id: 2,
                message: "Lorem ipsum dolor set amet",
                likeCounter: 15,
            },
            {
                id: 3,
                message: "Lorem ipsum dolor set amet. Lorem!",
                likeCounter: 11,
            },
        ]
    }

    let newState = profileReducer(state, action);

    expect(newState.postData.length).toBe(4);
  });