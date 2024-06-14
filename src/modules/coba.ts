export function getTeamScore(teamDices: string[]): number
{
    let score = 0;
    let blueCount = 0;
    let orangeCount = 0;
    let pinkCount = 0;
    let greyCount = 0;
    let greenCount = 0;
    let yellowCount = 0;

    for (let i = 0; i < teamDices.length; i++)
    {
        switch (teamDices[i])
        {
            case 'blue':
                blueCount++;
                break;
            case 'orange':
                orangeCount++;
                break;
            case 'pink':
                pinkCount++;
                break;
            case 'grey':
                greyCount++;
                break;
            case 'green':
                greenCount++;
                break;
            case 'yellow':
                yellowCount++;
                break;
        }
    }

    score += blueCount * 0;
    score += (teamDices.length % 2 !== 0) ? orangeCount * 1 : orangeCount * 2;
    score += pinkCount * 3;
    score += greyCount * 2;
    score += greenCount * 1;
    score += yellowCount * -1;

    return score;
}

export function isEqual(team1: string[], team2: string[]): boolean
{
    return getTeamScore(team1) === getTeamScore(team2);
}
export function findSolution(dices: string[]): string[][]
{
    return solutions;
}