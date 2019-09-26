import { Juego } from '../clases/juego'

export class JuegoAgilidad extends Juego {
    numeroIngresado: number;
    gano: boolean;

    maxNumber = 11;
    n1 = 0;
    n2 = 0;
    question: string;
    answer: number;
    userAnswer: string;
    lifePlayer: number = 0;
    scorePlayer: number = 0;


    constructor(nombre?: string, gano?: boolean, jugador?: string) {
        super("Agilidad Artimetica", gano, jugador);
    }

    reloadPage() {
        this.lifePlayer = 3;
        this.scorePlayer = 0;
        this.getNewQuestion();
    }

    getNewQuestion() {
        this.n1 = Math.floor(Math.random() * this.maxNumber);
        this.n2 = Math.floor(Math.random() * this.maxNumber);
        this.question = this.n1 + " + " + this.n2;
        this.answer = this.n1 + this.n2;
        this.userAnswer = "";
    }

    onVoiceAnswer() {
        if (this.userAnswer && parseInt(this.userAnswer) == this.answer) {
            this.onRightAnswer();
        }
    }

    public verificar() {
        if (this.userAnswer && parseInt(this.userAnswer) == this.answer) {
            return this.onRightAnswer();
        } else {
            return this.onWrongAnswer();
        }
    }

    onRightAnswer() {
        this.scorePlayer++;
        this.getNewQuestion();
        return true;
    }

    onWrongAnswer() {
        this.lifePlayer--;
        if (this.lifePlayer <= 0) {
            this.gano = false;
        }
        return false;
    }

    skipQuestion() {
        this.getNewQuestion();
        this.scorePlayer--;
    }

    range(num) {
        return new Array(num);
    }

}

