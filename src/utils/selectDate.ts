import { useAppSelector } from "@/hooks";

type SelectDateResponse = {
    startDate: string;
    endDate: string;
}
export const selectDate = (option: number | undefined): SelectDateResponse => {
    const date = useAppSelector((state) => state.selectedDate.date)
    const now = new Date();

    let startDate = new Date(
        now.getFullYear(),
        now.getMonth(),
        1,
        0,
        0,
        0,
        0,
    ).toISOString()

    let endDate = new Date(
        now.getFullYear(),
        now.getMonth() + 1,
        0,
        23,
        59,
        59,
        999,
    ).toISOString()

    if(option === undefined){
        let startDate = new Date(
            now.getFullYear(),
            now.getMonth(),
            1,
            0,
            0,
            0,
            0,
        ).toISOString()
    
        let endDate = new Date(
            now.getFullYear(),
            now.getMonth() + 1,
            0,
            23,
            59,
            59,
            999,
        ).toISOString()
    }

    if(option === 1){
        startDate = new Date(
            now.getFullYear(),
            now.getMonth(),
            1,
            0,
            0,
            0,
            0,
        ).toISOString()
    
        endDate = new Date(
            now.getFullYear(),
            now.getMonth() + 1,
            0,
            23,
            59,
            59,
            999,
        ).toISOString()

    }

    if(option === 2){
        startDate = new Date(
            now.getFullYear(),
            now.getMonth() - 1,
            1,
            0,
            0,
            0,
            0,
        ).toISOString()
    
        endDate = new Date(
            now.getFullYear(),
            now.getMonth(),
            0,
            23,
            59,
            59,
            999,
        ).toISOString()
    }

    if(option === 3){
        startDate = new Date(
            now.getFullYear(),
            now.getMonth() - 3,
            1,
            0,
            0,
            0,
            0,
        ).toISOString()
    
        endDate = new Date(
            now.getFullYear(),
            now.getMonth(),
            0,
            23,
            59,
            59,
            999,
        ).toISOString()
    }

    if(option === 4){
        if(date){
            startDate = `${date[0]}T03:00:00.000Z`
            endDate =  `${date[1]}T03:00:00.000Z`
        }
    }

    return { startDate, endDate};

}