import {describe, expect, it} from "vitest";
import { getTeamScore, isEqual, findSolution } from "../modules/coba.ts";

const data = [[
        [
            ['gray', 'gray', 'gray', 'gray', 'green', 'orange', 'green'],
            [
                ['gray', 'gray', 'gray'],
                ['green', 'orange', 'green', 'gray'],
            ]
        ],
        [
            ['gray', 'gray', 'gray', 'gray', 'orange', 'orange', 'yellow'],
            [
                ['gray', 'gray', 'orange', 'yellow'],
                ['orange', 'orange', 'gray'],
            ]
        ],
        [
            ['green', 'green', 'green', 'green', 'blue', 'gray', 'gray'],
            [
                ['green', 'green', 'blue'],
                ['green', 'green', 'gray', 'gray'],
            ]
        ],
        [
            ['gray', 'gray', 'gray', 'pink', 'green', 'yellow', 'green'],
            [
                ['gray', 'gray', 'pink'],
                ['green', 'yellow', 'green', 'gray'],
            ]
        ],
    ]];

//tous les tests en dehors des tests pour le pink dice passe
describe('Get team score', () => {
    describe('single value', () => {
        it('should return the value of the green dice', () => {
            expect(getTeamScore(['green'])).toBe(1);
        });
        it('should return the value of the gray dice', () => {
            expect(getTeamScore(['gray'])).toBe(2);
        });
        it('should return the value of the orange dice', () => {
            expect(getTeamScore(['orange'])).toBe(1);
        });
        it('should return the value of the yellow dice', () => {
            expect(getTeamScore(['yellow'])).toBe(-1);
        });
        it('should return the value of pink dice', () => {
            expect(getTeamScore(['pink'])).toBe(3);
        });
        it('should return the value of the blue dice when is alone', () => {
            expect(getTeamScore(['blue'])).toBe(0);
        });
    });
    describe('test special combo', () => {
        describe('test blue special combo', () => {
            it('should return the value of the blue dice when is with a green dice', () => {
                expect(getTeamScore(['blue', 'green'])).toBe(0 + 1);
            });
            it('should return the value of blue dice when is with another blue dice', () => {
                expect(getTeamScore(['blue', 'blue'])).toBe(0);
            });
            it('should return the value of the blue dice when is with a yellow dice', () => {
                expect(getTeamScore(['blue', 'yellow'])).toBe(0 - 1);
            });
            it('should return the value of the blue dice when is with a orange dice', () => {
                expect(getTeamScore(['blue', 'orange'])).toBe(0 + 2);
            });
            it('should return the value of the blue dice when is with a pink dice', () => {
                expect(getTeamScore(['blue', 'pink'])).toBe(0 + 3);
            });
            it('should return the value of the blue dice when is with a grey dice', () => {
                expect(getTeamScore(['blue', 'grey'])).toBe(0 + 2);
            });
            it('should return the value of the blue dice when is with 2 grey dices', () => {
                expect(getTeamScore(['blue', 'grey', 'grey'])).toBe(0 + 2 + 2);
            });
        });
        describe('test orange special combo', () => {
            it('should return the value of the orange dice when is with a blue dice', () => {
                expect(getTeamScore(['orange', 'blue'])).toBe(2 + 0);
            });
            it('should return the value of the orange dice when is with a yellow dice', () => {
                expect(getTeamScore(['orange', 'yellow'])).toBe(2 - 1);
            });
            it('should return the value of 2 orange dices', () => {
                expect(getTeamScore(['orange', 'orange'])).toBe(2);
            });
            it('should return the value of the orange dice when is with 2 green dices', () => {
                expect(getTeamScore(['orange', 'green', 'green'])).toBe(1 + 1 + 1);
            });
        });
        describe('test pink special combo', () => {
            it('should return the value of the pink dice when is with a blue dice', () => {
                expect(getTeamScore(['pink', 'blue'])).toBe(3 + 0);
            });
            it('should return the value of 2 pink dices', () => {
                expect(getTeamScore(['pink', 'pink'])).toBe(3 + 3);
            });
            it('should return the value of the pink dice when is with a yellow dice', () => {
                expect(getTeamScore(['pink', 'yellow'])).toBe(3 - 0);
            });
            it('should return the value of the pink dice when is with a orange dice', () => {
                expect(getTeamScore(['pink', 'orange'])).toBe(3 + 0);
            });
            it('should return the value of the pink dice when is with 2 green dices', () => {
                expect(getTeamScore(['pink', 'green', 'green'])).toBe(3 + 0 + 0);
            });
            it('should return the value of the pink dice when is with 2 green dice and 1 grey', () => {
                expect(getTeamScore(['pink', 'green', 'green', 'grey'])).toBe(3 + 0 + 0 + 2);
            });
        });
        describe('test yellow special combo', () => {
            it('should return the value of the yellow dice when is with a blue dice', () => {
                expect(getTeamScore(['yellow', 'green'])).toBe(-1 + 1);
            });
            it('should return the value of 2 yellow dices', () => {
                expect(getTeamScore(['yellow', 'yellow'])).toBe(-1 - 1);
            });
        });
    });
});
describe('Get team score are equal', () => {
    describe('single value', () => {
        it('try green team', () => {
            expect(isEqual(['green'],['green'])).toBe(true);
        });
        it('try gray team', () => {
            expect(isEqual(['gray'],['gray'])).toBe(true);
        });
        it('try purple team', () => {
            expect(isEqual(['orange'], ['orange'])).toBe(true);
        });
        it('try yellow team', () => {
            expect(isEqual(['yellow'], ['yellow'])).toBe(true);
        });
        it('try red team', () => {
            expect(isEqual(['pink'],['pink'])).toBe(true);
        });
        it('try blue team', () => {
            expect(isEqual(['blue'],['blue'])).toBe(true);
        });
    });
    //aucun des tests ne peut être executer car les fonctions ne sont pas implémentées
    describe('test special combo team', () => {
        it('try basic team', () => {
            expect(isEqual(['green', 'green', 'gray'], ['green', 'green','green', 'green'])).toBe(true);
        });
        it('try basic team with orange combo', () => {
            expect(isEqual(['gray', 'gray', 'gray'], ['green', 'green', 'gray', 'orange'])).toBe(true);
        });
        it('try basic team with orange and yellow combo', () => {
            expect(isEqual(['gray', 'gray', 'orange', 'yellow'], ['gray', 'gray','orange'])).toBe(true);
        });
        it('try basic team with blue combo', () => {
            expect(isEqual(['green', 'green', 'blue'], ['green', 'green','gray', 'gray'])).toBe(true);
        });
    }),

    describe('Find coba solutions', () => {
        describe('Solutions', () => {
            it.each(data)('Problem %# for %p', (input, solution) => {
                expect(findSolution(input)).toEqual(solution)
            })
        });
    });
});