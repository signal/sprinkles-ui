import React from 'react';
import TestUtils from 'react-addons-test-utils';
import Version from '../src/components/Version';


describe('Version', () => {
  it('Does render a Version component', () => {
    const versionComponent = TestUtils.renderIntoDocument(
      <Version />
    );
    expect(versionComponent).toBeDefined();
  });

  it('Does return true with exact tag match', () => {
    const versionComponent = TestUtils.renderIntoDocument(
      <Version />
    );
    expect(versionComponent.matchingTag({
      tag: 'a',
      tagVersion: 'a',
    })).toBe(false);
  });

  describe('Version/matchingTag', () => {
    it('Does return false when the tags do not match', () => {
      const versionComponent = TestUtils.renderIntoDocument(
        <Version />
      );
      expect(versionComponent.matchingTag({
        tag: 'a',
        tagVersion: 'b',
      })).toBe(false);
    });

    it('Does return false when no tag is present', () => {
      const versionComponent = TestUtils.renderIntoDocument(
        <Version />
      );
      expect(versionComponent.matchingTag({
        tagVersion: 'b',
      })).toBe(false);
    });

    it('Does return false when no tagVersion is present', () => {
      const versionComponent = TestUtils.renderIntoDocument(
        <Version />
      );
      expect(versionComponent.matchingTag({
        tag: 'a',
      })).toBe(false);
    });

    it('Does return false when both matchingTag and matchingVersion are false', () => {
      const versionComponent = TestUtils.renderIntoDocument(
        <Version />
      );
      versionComponent.matchingTag = jest.genMockFunction().mockReturnValue(false);
      versionComponent.matchingVersion = jest.genMockFunction().mockReturnValue(false);
      expect(versionComponent.showVersion()).toBe(false);
    });
  });

  describe('Verison/validVersion', () => {
    it('Does return true if valid version', () => {
      const versionComponent = TestUtils.renderIntoDocument(
        <Version />
      );
      expect(versionComponent.validVersion('0.0.1')).toBe(true);
      expect(versionComponent.validVersion('1')).toBe(true);
    });
    it('Does return false if invalid version', () => {
      const versionComponent = TestUtils.renderIntoDocument(
        <Version />
      );
      expect(versionComponent.validVersion('a')).toBe(false);
      expect(versionComponent.validVersion('')).toBe(false);
      expect(versionComponent.validVersion(undefined)).toBe(false);
      expect(versionComponent.validVersion(null)).toBe(false);
      expect(versionComponent.validVersion([])).toBe(false);
      expect(versionComponent.validVersion('a0.0.1')).toBe(false);
      expect(versionComponent.validVersion('.0.0.1')).toBe(false);
      expect(versionComponent.validVersion('0..0.1')).toBe(false);
      expect(versionComponent.validVersion('0..0.1.')).toBe(false);
      expect(versionComponent.validVersion('=<3.12.1')).toBe(false);
      expect(versionComponent.validVersion('=>3.12.1')).toBe(false);
      expect(versionComponent.validVersion('=3.12.1')).toBe(false);
      expect(versionComponent.validVersion('>0.0.1')).toBe(false);
      expect(versionComponent.validVersion('<0.0.1')).toBe(false);
      expect(versionComponent.validVersion('<3.12.1')).toBe(false);
      expect(versionComponent.validVersion('<=3.12.1')).toBe(false);
      expect(versionComponent.validVersion('>=3.12.1')).toBe(false);
    });
  });

  describe('Version/validVersionSelector', () => {
    it('Does return true if valid version', () => {
      const versionComponent = TestUtils.renderIntoDocument(
        <Version />
      );
      expect(versionComponent.validVersionSelector('0.0.1')).toBe(true);
      expect(versionComponent.validVersionSelector('>0.0.1')).toBe(true);
      expect(versionComponent.validVersionSelector('<0.0.1')).toBe(true);
      expect(versionComponent.validVersionSelector('<3.12.1')).toBe(true);
      expect(versionComponent.validVersionSelector('<=3.12.1')).toBe(true);
      expect(versionComponent.validVersionSelector('>=3.12.1')).toBe(true);
      expect(versionComponent.validVersionSelector('1')).toBe(true);
    });
    it('Does return false if invalid version', () => {
      const versionComponent = TestUtils.renderIntoDocument(
        <Version />
      );
      expect(versionComponent.validVersionSelector('a')).toBe(false);
      expect(versionComponent.validVersionSelector('')).toBe(false);
      expect(versionComponent.validVersionSelector(undefined)).toBe(false);
      expect(versionComponent.validVersionSelector(null)).toBe(false);
      expect(versionComponent.validVersionSelector([])).toBe(false);
      expect(versionComponent.validVersionSelector('a0.0.1')).toBe(false);
      expect(versionComponent.validVersionSelector('.0.0.1')).toBe(false);
      expect(versionComponent.validVersionSelector('0..0.1')).toBe(false);
      expect(versionComponent.validVersionSelector('0..0.1.')).toBe(false);
      expect(versionComponent.validVersionSelector('=<3.12.1')).toBe(false);
      expect(versionComponent.validVersionSelector('=>3.12.1')).toBe(false);
      expect(versionComponent.validVersionSelector('=3.12.1')).toBe(false);
    });
  });

  describe('Version/versionComparitor', () => {
    it('Does return 0 if version A and B are the same', () => {
      const versionComponent = TestUtils.renderIntoDocument(
        <Version />
      );
      let vA = '1';
      let vB = '1';
      expect(versionComponent.versionComparitor(vA, vB)).toBe(0);
      vA = '1.0';
      vB = '1.0';
      expect(versionComponent.versionComparitor(vA, vB)).toBe(0);
      vA = '1.00';
      vB = '1.0';
      expect(versionComponent.versionComparitor(vA, vB)).toBe(0);
      vA = '1.1';
      vB = '1.01';
      expect(versionComponent.versionComparitor(vA, vB)).toBe(0);
      vA = '1';
      vB = '1.0';
      expect(versionComponent.versionComparitor(vA, vB)).toBe(0);
      vA = '1.0';
      vB = '1';
      expect(versionComponent.versionComparitor(vA, vB)).toBe(0);
    });
    it('Does return -1 if version A is less than version B', () => {
      const versionComponent = TestUtils.renderIntoDocument(
        <Version />
      );
      let vA = '1';
      let vB = '2';
      expect(versionComponent.versionComparitor(vA, vB)).toBe(-1);
      vA = '1.0';
      vB = '1.1';
      expect(versionComponent.versionComparitor(vA, vB)).toBe(-1);
      vA = '1.0';
      vB = '1.0.1';
      expect(versionComponent.versionComparitor(vA, vB)).toBe(-1);
      vA = '1.1.1';
      vB = '1.01.2';
      expect(versionComponent.versionComparitor(vA, vB)).toBe(-1);
      vA = '1.0.0.0';
      vB = '1.0.1';
      expect(versionComponent.versionComparitor(vA, vB)).toBe(-1);
    });
    it('Does return -1 if version A is less than version B', () => {
      const versionComponent = TestUtils.renderIntoDocument(
        <Version />
      );
      let vA = '2';
      let vB = '1';
      expect(versionComponent.versionComparitor(vA, vB)).toBe(1);
      vA = '1.1';
      vB = '1.0';
      expect(versionComponent.versionComparitor(vA, vB)).toBe(1);
      vA = '1.0.1';
      vB = '1.0';
      expect(versionComponent.versionComparitor(vA, vB)).toBe(1);
      vA = '1.01.2';
      vB = '1.1.1';
      expect(versionComponent.versionComparitor(vA, vB)).toBe(1);
      vA = '1.0.1';
      vB = '1.0.0.0';
      expect(versionComponent.versionComparitor(vA, vB)).toBe(1);
    });
  });

  describe('Version/matchingVersion', () => {
    it('Does return true when version and versionSelector are exact match', () => {
      const versionComponent = TestUtils.renderIntoDocument(
        <Version />
      );
      expect(versionComponent.matchingVersion({
        version: '0.0.1',
        versionSelector: '0.0.1',
      })).toBe(true);
    });
    it('Does return true when version is greater than versionSelector', () => {
      const versionComponent = TestUtils.renderIntoDocument(
        <Version />
      );
      expect(versionComponent.matchingVersion({
        version: '0.0.1',
        versionSelector: '<0.0.2',
      })).toBe(true);
    });
    it('Does return true when version is greater than versionSelector', () => {
      const versionComponent = TestUtils.renderIntoDocument(
        <Version />
      );
      expect(versionComponent.matchingVersion({
        version: '0.0.3',
        versionSelector: '>0.0.2',
      })).toBe(true);
    });
    it('Does return true when version is less than or equal to versionSelector', () => {
      const versionComponent = TestUtils.renderIntoDocument(
        <Version />
      );
      expect(versionComponent.matchingVersion({
        version: '0.0.2',
        versionSelector: '<=0.0.2',
      })).toBe(true);
    });
    it('Does return true when version is greater than or equal to versionSelector', () => {
      const versionComponent = TestUtils.renderIntoDocument(
        <Version />
      );
      expect(versionComponent.matchingVersion({
        version: '0.0.2',
        versionSelector: '>=0.0.2',
      })).toBe(true);
    });
    it('Does return false when version is less than versionSelector', () => {
      const versionComponent = TestUtils.renderIntoDocument(
        <Version />
      );
      expect(versionComponent.matchingVersion({
        version: '0.0.1',
        versionSelector: '>0.0.2',
      })).toBe(false);
    });
    it('Does return false when version is greater than versionSelector', () => {
      const versionComponent = TestUtils.renderIntoDocument(
        <Version />
      );
      expect(versionComponent.matchingVersion({
        version: '0.0.3',
        versionSelector: '<0.0.2',
      })).toBe(false);
    });
    it('Does return false when version is less than or greater to versionSelector', () => {
      const versionComponent = TestUtils.renderIntoDocument(
        <Version />
      );
      expect(versionComponent.matchingVersion({
        version: '0.0.1',
        versionSelector: '>=0.0.2',
      })).toBe(false);
    });
    it('Does return false when version is greater than or equal to versionSelector', () => {
      const versionComponent = TestUtils.renderIntoDocument(
        <Version />
      );
      expect(versionComponent.matchingVersion({
        version: '0.0.3',
        versionSelector: '<=0.0.2',
      })).toBe(false);
    });
  });

  describe('Version/showVersion', () => {
    it('Does return true when both matchingTag=true and matchingVersion=false', () => {
      const versionComponent = TestUtils.renderIntoDocument(
        <Version />
      );
      versionComponent.matchingTag = jest.genMockFunction().mockReturnValue(true);
      versionComponent.matchingVersion = jest.genMockFunction().mockReturnValue(false);
      expect(versionComponent.showVersion()).toBe(true);
    });

    it('Does return true when both matchingTag=true and matchingVersion=false', () => {
      const versionComponent = TestUtils.renderIntoDocument(
        <Version />
      );
      versionComponent.matchingTag = jest.genMockFunction().mockReturnValue(false);
      versionComponent.matchingVersion = jest.genMockFunction().mockReturnValue(true);
      expect(versionComponent.showVersion()).toBe(true);
    });
  });
});
