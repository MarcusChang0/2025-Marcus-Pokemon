// src/routes/game/coverage/[team]/+page.js
export const load = ({ params }) => {
    const game = params.game; // slug from parent route
    const team = params.team; // index
    return { game, team };
};