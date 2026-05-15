const Route = {
    TOP_LEFT: 'TOP_LEFT',
    TOP_RIGHT: 'TOP_RIGHT',
    BOTTOM_LEFT: 'BOTTOM_LEFT',
    BOTTOM_RIGHT: 'BOTTOM_RIGHT'
};

function main() {
    const text = "чеекбыли_ни,лв__ти_ием__омть_омоантвое_мбебкои_тжгелсхы,рсе_еиавов_еедв_нд_даевбуыяпаьинс_ябксо_тм_ле,_ль___ыиин_еатпй__м__ондаоо___онн_ывлн____";
    const n = Math.sqrt(text.length);
    const table = [];
    
    for (let i = 0, idx = 0; i < n; i++) {
        table[i] = [];
        for (let j = 0; j < n; j++) {
            table[i][j] = text[idx++];
        }
    }

    const routes = [Route.TOP_LEFT, Route.TOP_RIGHT, Route.BOTTOM_LEFT, Route.BOTTOM_RIGHT];
    for (const route of routes) {
        console.log(readByRoute(table, route));
    }
}

function readByRoute(table, route) {
    const n = table.length;
    const path = [];
    const visited = [];

    for (let i = 0; i < n; i++) {
        visited[i] = [];
        for (let j = 0; j < n; j++) {
            visited[i][j] = false;
        }
    }

    let r = (route === Route.TOP_LEFT || route === Route.TOP_RIGHT) ? 0 : n - 1;
    let c = (route === Route.TOP_LEFT || route === Route.BOTTOM_LEFT) ? 0 : n - 1;
    const hDir = (route === Route.TOP_LEFT || route === Route.BOTTOM_LEFT) ? 1 : -1;
    const vDir = (route === Route.TOP_LEFT || route === Route.TOP_RIGHT) ? 1 : -1;
    
    let d1r, d1c, d2r, d2c;
    if (route === Route.TOP_LEFT) {
        d1r = 1; d1c = -1;  // вниз-влево
        d2r = -1; d2c = 1;  // вверх-вправо
    } else if (route === Route.TOP_RIGHT) {
        d1r = 1; d1c = 1;   // вниз-вправо
        d2r = -1; d2c = -1; // вверх-влево
    } else if (route === Route.BOTTOM_LEFT) {
        d1r = -1; d1c = -1; // вверх-влево
        d2r = 1; d2c = 1;   // вниз-вправо
    } else { // BOTTOM_RIGHT
        d1r = -1; d1c = 1;  // вверх-вправо
        d2r = 1; d2c = -1;  // вниз-влево
    }

    path.push([r, c]);
    visited[r][c] = true;

    while (path.length < n * n) {
        if (c + hDir >= 0 && c + hDir < n && !visited[r][c + hDir]) {
            c += hDir;
            path.push([r, c]);
        }
        while (true) {
            const nr = r + d1r, nc = c + d1c;
            if (nr >= 0 && nr < n && nc >= 0 && nc < n && !visited[nr][nc]) {
                r = nr; c = nc;
                path.push([r, c]);
                visited[r][c] = true;
            } else break;
        }
        if (r + vDir >= 0 && r + vDir < n && !visited[r + vDir][c]) {
            r += vDir;
            path.push([r, c]);
            visited[r][c] = true;
        }
        while (true) {
            const nr = r + d2r, nc = c + d2c;
            if (nr >= 0 && nr < n && nc >= 0 && nc < n && !visited[nr][nc]) {
                r = nr; c = nc;
                path.push([r, c]);
                visited[r][c] = true;
            } else break;
        }
    }

    let sb = '';
    for (const cell of path) {
        sb += table[cell[0]][cell[1]];
    }
    return sb;
}

main();
