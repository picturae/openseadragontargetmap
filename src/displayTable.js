import { isAttachedToDom, isPrimitive, hasOwnProperty } from 'my-lib'
import transformCase from 'transform-case'

/**
 * Serialise the values
 * @param {any} value
 * @returns {string} html string
 */
const readableValue = value => {
    if (value === null) {
        return '--'
    }
    if (typeof value === 'boolean') {
        let bool = `<deltaeboolean class="${
            value ? 'valid' : 'invalid'
        }"></deltaeboolean>`
        return bool
    }
    if (isPrimitive(value)) return value
    if (value instanceof Array && value.length) {
        if (isPrimitive(value[0])) return value.join(', ')
        if (typeof value[0] === 'object') {
            let fragment = ''
            for (let i = 0; i < value.length; i++) {
                fragment += readableValue(value[i])
            }
            return fragment
        }
    }
    if (typeof value === 'object' && !(value instanceof Array)) {
        let fragment = ''
        for (let [property, content] of Object.entries(value)) {
            let line = ''
            if (typeof content === 'boolean') {
                line = `${readableValue(content)} ${transformCase(
                    property,
                ).humanTitle()}<br/>`
            } else {
                line = `${transformCase(
                    property,
                ).humanTitle()}: ${readableValue(content)}<br/>`
            }
            if (line) fragment += line
        }
        return fragment + ''
    }
}

/**
 * Serialise grouped data
 * @param {string} groupName
 * @param {object} groupData
 * @returns {string} html string
 */
const dataBody = (groupName, groupData) => {
    let body = `<tbody class="deltaemap-${groupName}" data-name="${groupName}">`
    for (let [key, value] of Object.entries(groupData)) {
        let row = ''
        // '\u0394' === '&Delta;'
        const label = transformCase(key.replace(/(d|D)elta/, '\u0394'), {
            delimit: [/(\u0394)\w{1}/],
        }).humanTitle()
        const className = transformCase(key).paramCase()
        row = `<tr class="${className}"><th>${label}</th><td>${readableValue(
            value,
        )}</td></tr>`
        if (row) body += row
    }
    body += '</tbody>'
    return body
}

/**
 * Serialise server data
 * @param {object} event mouseEnterEvent
 * @param {object} table htmlElement
 * @param {string} targetData dataSet string
 * @returns {string} html string
 */
const renderData = (event, table, targetData) => {
    table.innerHTML = ''
    table.classList.remove(
        'deltaemap-overlay',
        'deltaemap-chart',
        'deltaemap-patch',
    )
    const className = event.target.tagName
        .toLowerCase()
        .replace('deltae', 'deltaemap-')
    table.classList.add(className)
    const userData = JSON.parse(targetData)
    let colorSquare = ''
    if (userData.observed && userData.observed.RGB) {
        let color = `rgb(${userData.observed.RGB.join()})`
        colorSquare = `<deltaecolor style="background: ${color};"></deltaecolor>`
    }
    table.innerHTML += `<caption>
        ${userData.name} ${colorSquare}
    </caption>`

    // display the following data in the following order
    if (userData.assessed) {
        table.innerHTML += dataBody('assessed', userData.assessed)
    }
    if (userData.observed) {
        table.innerHTML += dataBody('observed', userData.observed)
    }
    if (userData.reference) {
        table.innerHTML += dataBody('reference', userData.reference)
    }
    if (userData.validity) {
        if (hasOwnProperty(userData.validity, 'valid')) {
            const isValid = userData.validity.valid
            table.classList.remove('valid', 'invalid')
            table.classList.add(isValid ? 'valid' : 'invalid')
        }
        table.innerHTML += dataBody('validity', userData.validity)
    }
}

const DisplayTable = function(mainElement) {
    this.name = 'DisplayTable'
    const eventRoot = document.body
    const docRoot = document.documentElement
    const displayRoot = mainElement.parentNode
    const table = document.createElement('table')
    this.element = table
    table.className = 'picturae-deltaemap-display'

    /**
     * Update the table with new data
     * @param {object} event
     */
    const targetEnter = function(event) {
        const targetData = event.target.dataset.picturaeDeltaemapDisplay
        if (targetData) {
            renderData(event, table, targetData)
            if (!isAttachedToDom(table)) displayRoot.appendChild(table)
        }
    }

    /**
     * Remove table from DOM when needed
     */
    const targetLeave = function() {
        if (isAttachedToDom(table)) displayRoot.removeChild(table)
    }

    eventRoot.addEventListener('mouseover', function(event) {
        const enter = event.target
        if (
            enter.tagName === 'DELTAEOVERLAY' ||
            enter.tagName === 'DELTAECHART' ||
            enter.tagName === 'DELTAEPATCH'
        ) {
            targetEnter(event)
        } else if (!table.contains(enter)) {
            targetLeave(event)
        }
        event.stopPropagation()
    })

    eventRoot.addEventListener('mousemove', function(event) {
        const offPointer = 16

        if (event.clientX / docRoot.clientWidth < 0.5) {
            table.style.left = `${event.clientX + offPointer}px`
            table.style.right = 'auto'
        } else {
            table.style.left = 'auto'
            table.style.right = `${docRoot.clientWidth -
                event.clientX +
                offPointer}px`
        }

        const ySpace = (docRoot.clientHeight - table.clientHeight) / 2

        if (event.clientY < ySpace - offPointer) {
            table.style.top = `${event.clientY + offPointer}px`
            table.style.bottom = 'auto'
        } else if (event.clientY < ySpace + offPointer + table.clientHeight) {
            table.style.top = `${ySpace}px`
            table.style.bottom = 'auto'
        } else {
            table.style.top = 'auto'
            table.style.bottom = `${docRoot.clientHeight -
                event.clientY +
                offPointer}px`
        }
        event.stopPropagation()
    })
}

export { DisplayTable, renderData, dataBody }
