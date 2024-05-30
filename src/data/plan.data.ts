import { PlanTypeEnum } from "../common/enum/plan.enum"

export const PlanData = [
    {
        id: 1,
        title: "Plan",
        subtitle: "Gratis",
        price: 0,
        changes: 2,
        button: "Contratar",
        color: "#a78bfa",
        animation: "animate__animated animate__backInLeft",
        type: "FREE"
    },
    {
        id: 2,
        title: "Plan",
        subtitle: "Básico",
        price: 10000,
        changes: 5,
        button: "Contratar",
        color: "#a78bfa",
        animation: "animate__animated animate__backInUp",
        type: PlanTypeEnum.BASIC
    },
    {
        id: 3,
        title: "Plan",
        subtitle: "Premium",
        price: 20000,
        changes: 15,
        button: "Contratar",
        color: "#a78bfa",
        animation: "animate__animated animate__backInRight",
        type: PlanTypeEnum.PREMIUM
    }
]

export type PlanRender = typeof PlanData[0]