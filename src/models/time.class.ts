import { Property, Required } from "@tsed/schema";

/**
 * If Number === 0 -> frontend shows N (invalid attempt)
 */

export class Time {
    @Property()
    @Required()
    left: Number;

    @Property()
    @Required()
    right: Number;

    @Property()
    @Required()
    final: Number;
}

export class TimeTemplate {
    @Property()
    @Required()
    left: Number;

    @Property()
    @Required()
    right: Number;

    @Property()
    final: Number;
}