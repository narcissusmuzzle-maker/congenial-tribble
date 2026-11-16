import assert from 'node:assert'
import * as lay from '../shared/layout.js'

let n = 0
function t(name, f) { f(); n++; console.log('ok  ' + name) }

t('карточка: ширина 428, поля 2 px по бокам; одна строка 58 px, две строки 92 px', () => {
  const a = lay.cardRect(10, 1), b = lay.cardRect(72, 2)
  assert.equal(a.x, 2); assert.equal(a.w, 428); assert.equal(a.x + a.w, 430)
  assert.equal(a.h, 58); assert.equal(b.h, 92)
})

t('на экран без прокрутки помещается восемь однострочных задач', () => {
  assert.equal(lay.LIST_H, 494)
  const eight = 8 * lay.cardH(1) + 7 * lay.GAP
  assert.ok(eight <= lay.LIST_H)
  assert.ok(9 * lay.cardH(1) + 8 * lay.GAP > lay.LIST_H)
})

t('полоска: 75 px справа вплотную к краю карточки, три части по 23 с зазорами 3', () => {
  assert.equal(3 * lay.SEG_LEN + 2 * lay.SEG_GAP, lay.STRIP_LEN)
  const s = [0, 1, 2].map((k) => lay.segRect(10, 1, k))
  assert.deepEqual(s.map((r) => r.x), [355, 381, 407])
  assert.equal(s[2].x + s[2].w, 430)
  assert.ok(s.every((r) => r.w === 23 && r.y === 10 && r.h === 58))
})

t('полоска растягивается на две строки: части на всю высоту двухстрочной карточки', () => {
  const s = lay.segRect(100, 2, 1)
  assert.equal(s.y, 100); assert.equal(s.h, 92)
})

t('эмодзи слева на уровне первой строки; текст между эмодзи и полоской', () => {
  const e = lay.emojiRect(10)
  assert.equal(e.x, 12); assert.equal(e.y, 20); assert.equal(e.w, 38)
  assert.equal(lay.textX(), 58)
  assert.equal(lay.textX() + lay.textWidth() + lay.TEXT_PAD, 355)   // дальше начинается полоска
  assert.equal(lay.textWidth(), 289)
})

t('строки текста: вторая ровно под первой', () => {
  const a = lay.lineRect(10, 0), b = lay.lineRect(10, 1)
  assert.equal(a.y, 22); assert.equal(b.y - a.y, lay.LINE_PITCH)
  assert.ok(b.y + b.h <= 10 + lay.cardH(2))
})

t('цвета сегментов: зелёный, жёлтый, красный как квадратики на телефоне', () => {
  assert.equal(lay.segColor(0), 0x3fb950)
  assert.equal(lay.segColor(1), 0xe3b341)
  assert.equal(lay.segColor(2), 0xf85149)
  assert.equal(lay.segColor('мусор'), 0x3fb950)
})

console.log('\nвсего: ' + n)
