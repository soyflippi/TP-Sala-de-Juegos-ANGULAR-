export const MESSAGE_DURATION = 1000
export const LIGHT_DURATION = 400
export const SOLUTION_DELAY = 600
const NOTES = [440, 493.88, 523.25, 587.33]

const audioContext = new (<any>window).AudioContext()

export function generateSolution(): number[] {
    const solution = []
    for (let i = 0; i < 100; i++) {
        solution.push(Math.floor(Math.random() * 10000 % 4))
    }
    return solution
}

export function playSound(pad: number): void {
    if (pad !== null) {
        const oscillator = audioContext.createOscillator()
        oscillator.type = 'sine'
        oscillator.frequency.setValueAtTime(NOTES[pad], audioContext.currentTime)
        oscillator.connect(audioContext.destination)
        oscillator.start()
        setTimeout(() => oscillator.stop(), 200)
    }
}

export class Turn {
    // current level of the game (start at 1, equal to the number of pads to
    // remember at this level)
    readonly level: number
    // true if the previous turn ended by losing
    readonly previousWasLost: boolean
    // index of the click at which the level started (the sequence of clicks starts
    // with the component load and never finishes or restarts)
    readonly startedAt: number

    constructor(level = 1, previousWasLost = false, startedAt = 0) {
        this.level = level
        this.previousWasLost = previousWasLost
        this.startedAt = startedAt
    }

    public loose(currentClickIndex: number): Turn {
        return new Turn(1, true, currentClickIndex + 1)
    }

    public win(currentClickIndex: number): Turn {
        return new Turn(this.level + 1, false, currentClickIndex + 1)
    }
}

export function nextTurn(solution: number[], turn: Turn, padNumber: number, seqIndex: number): Turn {
    if (padNumber === null) {
        // not a user click : do nothing
        return turn
    } else if (padNumber === solution[seqIndex - turn.startedAt]) {
        if (seqIndex - turn.startedAt === turn.level - 1) {
            // good click, finishing a level : level up, start at the next click
            return turn.win(seqIndex)
        } else {
            // good click, part of a level : do nothing
            return turn
        }
    } else {
        // bad click : restart at turn 1, indicating the lost and starting at the next click
        return turn.loose(seqIndex)
    }
}

