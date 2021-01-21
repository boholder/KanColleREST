import {NameModel, ShipNameModel} from '../../model/name.model.js';

test('Name ja_jp -> ja_romaji -> en_us value convert', () => {
    let name = {
        ja_jp: "test"
    }
    expect(new NameModel(name).en_us).toBe('Test');
});

test('Name leak of value input handle', () => {
    let actual = new NameModel();
    expect(actual.en_us).toBe('')
    expect(actual.ja_jp).toBe('')
    expect(actual.ja_kana).toBe('')
    expect(actual.zh_cn).toBe('')
});

test('build ShipName leak of value input handle', () => {
    return ShipNameModel.build().then(actual => {
        expect(actual.en_us).toBe('');
        expect(actual.ja_jp).toBe('');
        expect(actual.ja_kana).toBe('');
        expect(actual.zh_cn).toBe('');
    });
});