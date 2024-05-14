class Duration {

    private milliseconds: number;

    constructor(milliseconds: number) {
        this.milliseconds = milliseconds;
    }

    ofHours(hours: number): Duration {
        this.milliseconds += hours * 60 * 60 * 1000;
        return this;
    }

    ofMinutes(minutes: number): Duration {
        this.milliseconds += minutes * 60 * 1000;
        return this;
    }

    ofSeconds(seconds: number): Duration {
        this.milliseconds += seconds * 1000;
        return this;
    }

    toISOString(): string {
        const totalSeconds = this.milliseconds / 1000;
        const seconds = Math.floor(totalSeconds % 60);
        const totalMinutes = totalSeconds / 60;
        const minutes = Math.floor(totalMinutes % 60);
        const totalHours = totalMinutes / 60;
        const hours = Math.floor(totalHours % 24);
        const days = Math.floor(totalHours / 24);

        return `P${days}DT${hours}H${minutes}M${seconds}S`;
    }
}