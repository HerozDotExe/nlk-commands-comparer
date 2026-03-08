function sortArgs(args: string[]) {
    const withValues = []
    const withoutValues = []
    let cp = ""

    while (args.join(" ").includes("-cp")) {
        for (let [i, a] of args.entries()) {
            if (a.startsWith("-cp")) {
                cp = args.splice(i, 2)[1]
                break
            }
        }
    }

    while (args.join(" ").includes("-X") || args.join(" ").includes("-D")) {
        for (let [i, a] of args.entries()) {
            if (a.startsWith("-X") || a.startsWith("-D")) {
                withoutValues.push(args.splice(i, 1).join(" "))
                break
            }
        }
    }

    while (args.join(" ").includes("--")) {
        for (let [i, a] of args.entries()) {
            if (a.startsWith("--")) {
                withValues.push(args.splice(i, 2).join(" "))
                break
            }
        }
    }

    return { withValues, withoutValues, other: args, cp }
}

function findSame(args1: string[], args2: string[]) {
    const same = []
    for (const [index1, arg1] of args1.entries()) {
        for (const [index2, arg2] of args2.entries()) {
            if (arg1 === arg2) {
                same.push(arg1)
                break
            }
        }
    }
    return same
}

export type Compared = {
    commands: {
        first: string,
        second: string
    },
    cp: {
        same: string[],
        different1: string[],
        different2: string[]
    },
    args: {
        same: {
            withValues: string[],
            withoutValues: string[],
            other: string[]
        },
        differents: {
            withValues1: string[],
            withValues2: string[],
            withoutValues1: string[],
            withoutValues2: string[],
            other1: string[],
            other2: string[]
        }
    }
}

export function comparer(cli1: [string, string[]], cli2: [string, string[]], isWindows: boolean): Compared {
    const command1 = cli1[0]
    const args1 = cli1[1]
    const command2 = cli2[0]
    const args2 = cli2[1]

    const { withValues: withValues1, withoutValues: withoutValues1, other: other1, cp: cp1 } = sortArgs(args1)
    const { withValues: withValues2, withoutValues: withoutValues2, other: other2, cp: cp2 } = sortArgs(args2)

    const sameWithValues = findSame(withValues1, withValues2)
    const sameWithoutValues = findSame(withoutValues1, withoutValues2)
    const sameOther = findSame(other1, other2)

    const differentWithValues1 = []
    const differentWithoutValues1 = []
    const differentOther1 = []
    for (const [i, a] of withValues1.entries()) {
        if (!sameWithValues.includes(a)) {
            differentWithValues1.push(a)
        }
    }
    for (const [i, a] of withoutValues1.entries()) {
        if (!sameWithoutValues.includes(a)) {
            differentWithoutValues1.push(a)
        }
    }
    for (const [i, a] of other1.entries()) {
        if (!sameOther.includes(a)) {
            differentOther1.push(a)
        }
    }
    const differentWithValues2 = []
    const differentWithoutValues2 = []
    const differentOther2 = []
    for (const [i, a] of withValues2.entries()) {
        if (!sameWithValues.includes(a)) {
            differentWithValues2.push(a)
        }
    }
    for (const [i, a] of withoutValues2.entries()) {
        if (!sameWithoutValues.includes(a)) {
            differentWithoutValues2.push(a)
        }
    }
    for (const [i, a] of other2.entries()) {
        console.log(a, sameOther, !sameOther.includes(a))
        if (!sameOther.includes(a)) {
            console.log("pushed", a)
            differentOther2.push(a)
        }
    }

    const parsedCp1 = cp1.split(isWindows ? ";" : ":")
    const parsedCp2 = cp2.split(isWindows ? ";" : ":")

    const sameCp = findSame(parsedCp1, parsedCp2)
    const differentCp1 = []
    const differentCp2 = []

    for (const [i, a] of parsedCp1.entries()) {
        if (!sameCp.includes(a)) {
            differentCp1.push(a)
        }
    }
    for (const [i, a] of parsedCp2.entries()) {
        if (!sameCp.includes(a)) {
            differentCp2.push(a)
        }
    }

    return {
        commands: {
            first: command1,
            second: command2
        },
        cp: {
            same: sameCp,
            different1: differentCp1,
            different2: differentCp2
        },
        args: {
            same: {
                withValues: sameWithValues,
                withoutValues: sameWithoutValues,
                other: sameOther
            },
            differents: {
                withValues1: differentWithValues1,
                withValues2: differentWithValues2,
                withoutValues1: differentWithoutValues1,
                withoutValues2: differentWithoutValues2,
                other1: differentOther1,
                other2: differentOther2
            }
        }
    }
}