/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0; you may not use this file except in compliance with the Elastic License
 * 2.0.
 */

import React from 'react';
import { mount, shallow } from 'enzyme';

import { SelectRuleType } from '.';
import { TestProviders, useFormFieldMock } from '../../../../common/mock';
import { useIsExperimentalFeatureEnabled } from '../../../../common/hooks/use_experimental_features';

jest.mock('../../../../common/lib/kibana');

jest.mock('../../../../common/hooks/use_experimental_features', () => ({
  useIsExperimentalFeatureEnabled: jest.fn().mockReturnValue(false), // enabled (esqlRulesDisabled = false)
}));
const useIsExperimentalFeatureEnabledMock = useIsExperimentalFeatureEnabled as jest.Mock;

const mockESQLEnabled = jest.fn(() => true);
jest.mock('../../../../common/lib/kibana', () => {
  const useKibana = jest.requireActual('../../../../common/lib/kibana').useKibana;
  return {
    useKibana: () => ({
      services: { ...useKibana().services, configSettings: { ESQLEnabled: mockESQLEnabled() } },
    }),
  };
});

describe('SelectRuleType', () => {
  it('renders correctly', () => {
    const Component = () => {
      const field = useFormFieldMock();

      return (
        <SelectRuleType
          field={field}
          describedByIds={[]}
          isUpdateView={false}
          hasValidLicense={true}
          isMlAdmin={true}
        />
      );
    };
    const wrapper = shallow(<Component />);

    expect(wrapper.dive().find('[data-test-subj="selectRuleType"]')).toHaveLength(1);
  });

  describe('update mode vs. non-update mode', () => {
    it('renders all the cards when not in update mode', () => {
      const field = useFormFieldMock<unknown>({ value: 'query' });
      const wrapper = mount(
        <TestProviders>
          <SelectRuleType
            describedByIds={[]}
            field={field}
            isUpdateView={false}
            hasValidLicense={true}
            isMlAdmin={true}
          />
        </TestProviders>
      );
      expect(wrapper.find('[data-test-subj="customRuleType"]').exists()).toBeTruthy();
      expect(wrapper.find('[data-test-subj="machineLearningRuleType"]').exists()).toBeTruthy();
      expect(wrapper.find('[data-test-subj="thresholdRuleType"]').exists()).toBeTruthy();
      expect(wrapper.find('[data-test-subj="eqlRuleType"]').exists()).toBeTruthy();
      expect(wrapper.find('[data-test-subj="threatMatchRuleType"]').exists()).toBeTruthy();
      expect(wrapper.find('[data-test-subj="esqlRuleType"]').exists()).toBeTruthy();
    });

    it('renders only the card selected when in update mode of "eql"', () => {
      const field = useFormFieldMock<unknown>({ value: 'eql' });
      const wrapper = mount(
        <TestProviders>
          <SelectRuleType
            describedByIds={[]}
            field={field}
            isUpdateView={true}
            hasValidLicense={true}
            isMlAdmin={true}
          />
        </TestProviders>
      );
      expect(wrapper.find('[data-test-subj="customRuleType"]').exists()).toBeFalsy();
      expect(wrapper.find('[data-test-subj="machineLearningRuleType"]').exists()).toBeFalsy();
      expect(wrapper.find('[data-test-subj="thresholdRuleType"]').exists()).toBeFalsy();
      expect(wrapper.find('[data-test-subj="eqlRuleType"]').exists()).toBeTruthy();
      expect(wrapper.find('[data-test-subj="threatMatchRuleType"]').exists()).toBeFalsy();
      expect(wrapper.find('[data-test-subj="esqlRuleType"]').exists()).toBeFalsy();
    });

    it('renders only the card selected when in update mode of "machine_learning', () => {
      const field = useFormFieldMock<unknown>({ value: 'machine_learning' });
      const wrapper = mount(
        <TestProviders>
          <SelectRuleType
            describedByIds={[]}
            field={field}
            isUpdateView={true}
            hasValidLicense={true}
            isMlAdmin={true}
          />
        </TestProviders>
      );
      expect(wrapper.find('[data-test-subj="customRuleType"]').exists()).toBeFalsy();
      expect(wrapper.find('[data-test-subj="machineLearningRuleType"]').exists()).toBeTruthy();
      expect(wrapper.find('[data-test-subj="thresholdRuleType"]').exists()).toBeFalsy();
      expect(wrapper.find('[data-test-subj="eqlRuleType"]').exists()).toBeFalsy();
      expect(wrapper.find('[data-test-subj="threatMatchRuleType"]').exists()).toBeFalsy();
      expect(wrapper.find('[data-test-subj="esqlRuleType"]').exists()).toBeFalsy();
    });

    it('renders only the card selected when in update mode of "query', () => {
      const field = useFormFieldMock<unknown>({ value: 'query' });
      const wrapper = mount(
        <TestProviders>
          <SelectRuleType
            describedByIds={[]}
            field={field}
            isUpdateView={true}
            hasValidLicense={true}
            isMlAdmin={true}
          />
        </TestProviders>
      );
      expect(wrapper.find('[data-test-subj="customRuleType"]').exists()).toBeTruthy();
      expect(wrapper.find('[data-test-subj="machineLearningRuleType"]').exists()).toBeFalsy();
      expect(wrapper.find('[data-test-subj="thresholdRuleType"]').exists()).toBeFalsy();
      expect(wrapper.find('[data-test-subj="eqlRuleType"]').exists()).toBeFalsy();
      expect(wrapper.find('[data-test-subj="threatMatchRuleType"]').exists()).toBeFalsy();
      expect(wrapper.find('[data-test-subj="esqlRuleType"]').exists()).toBeFalsy();
    });

    it('renders only the card selected when in update mode of "threshold"', () => {
      const field = useFormFieldMock<unknown>({ value: 'threshold' });
      const wrapper = mount(
        <TestProviders>
          <SelectRuleType
            describedByIds={[]}
            field={field}
            isUpdateView={true}
            hasValidLicense={true}
            isMlAdmin={true}
          />
        </TestProviders>
      );
      expect(wrapper.find('[data-test-subj="customRuleType"]').exists()).toBeFalsy();
      expect(wrapper.find('[data-test-subj="machineLearningRuleType"]').exists()).toBeFalsy();
      expect(wrapper.find('[data-test-subj="thresholdRuleType"]').exists()).toBeTruthy();
      expect(wrapper.find('[data-test-subj="eqlRuleType"]').exists()).toBeFalsy();
      expect(wrapper.find('[data-test-subj="threatMatchRuleType"]').exists()).toBeFalsy();
      expect(wrapper.find('[data-test-subj="esqlRuleType"]').exists()).toBeFalsy();
    });

    it('renders only the card selected when in update mode of "threat_match', () => {
      const field = useFormFieldMock<unknown>({ value: 'threat_match' });
      const wrapper = mount(
        <TestProviders>
          <SelectRuleType
            describedByIds={[]}
            field={field}
            isUpdateView={true}
            hasValidLicense={true}
            isMlAdmin={true}
          />
        </TestProviders>
      );
      expect(wrapper.find('[data-test-subj="customRuleType"]').exists()).toBeFalsy();
      expect(wrapper.find('[data-test-subj="machineLearningRuleType"]').exists()).toBeFalsy();
      expect(wrapper.find('[data-test-subj="thresholdRuleType"]').exists()).toBeFalsy();
      expect(wrapper.find('[data-test-subj="eqlRuleType"]').exists()).toBeFalsy();
      expect(wrapper.find('[data-test-subj="threatMatchRuleType"]').exists()).toBeTruthy();
      expect(wrapper.find('[data-test-subj="esqlRuleType"]').exists()).toBeFalsy();
    });

    it('renders only the card selected when in update mode of "esql"', () => {
      const field = useFormFieldMock<unknown>({ value: 'esql' });
      const wrapper = mount(
        <TestProviders>
          <SelectRuleType
            describedByIds={[]}
            field={field}
            isUpdateView={true}
            hasValidLicense={true}
            isMlAdmin={true}
          />
        </TestProviders>
      );
      expect(wrapper.find('[data-test-subj="customRuleType"]').exists()).toBeFalsy();
      expect(wrapper.find('[data-test-subj="machineLearningRuleType"]').exists()).toBeFalsy();
      expect(wrapper.find('[data-test-subj="thresholdRuleType"]').exists()).toBeFalsy();
      expect(wrapper.find('[data-test-subj="eqlRuleType"]').exists()).toBeFalsy();
      expect(wrapper.find('[data-test-subj="threatMatchRuleType"]').exists()).toBeFalsy();
      expect(wrapper.find('[data-test-subj="esqlRuleType"]').exists()).toBeTruthy();
    });

    it('should not render "esql" rule type if esql setting is disabled', () => {
      mockESQLEnabled.mockReturnValueOnce(false);
      const Component = () => {
        const field = useFormFieldMock();

        return (
          <SelectRuleType
            field={field}
            describedByIds={[]}
            isUpdateView={false}
            hasValidLicense={true}
            isMlAdmin={true}
          />
        );
      };
      const wrapper = shallow(<Component />);
      expect(wrapper.find('[data-test-subj="esqlRuleType"]').exists()).toBeFalsy();
    });

    it('should not render "esql" rule type if the feature flag is disabled', () => {
      useIsExperimentalFeatureEnabledMock.mockReturnValue(true); // disabled (esqlRulesDisabled = true)
      const Component = () => {
        const field = useFormFieldMock();

        return (
          <SelectRuleType
            field={field}
            describedByIds={[]}
            isUpdateView={false}
            hasValidLicense={true}
            isMlAdmin={true}
          />
        );
      };
      const wrapper = shallow(<Component />);
      expect(wrapper.find('[data-test-subj="esqlRuleType"]').exists()).toBeFalsy();
    });
  });

  describe('permissions', () => {
    it('renders machine learning as disabled if "hasValidLicense" is false and it is not selected', () => {
      const field = useFormFieldMock<unknown>({ value: 'query' });
      const wrapper = mount(
        <TestProviders>
          <SelectRuleType
            describedByIds={[]}
            field={field}
            isUpdateView={false}
            hasValidLicense={false}
            isMlAdmin={true}
          />
        </TestProviders>
      );
      expect(
        wrapper.find('[data-test-subj="machineLearningRuleType"]').first().prop('isDisabled')
      ).toEqual(true);
    });

    it('renders machine learning as not disabled if "hasValidLicense" is false and it is selected', () => {
      const field = useFormFieldMock<unknown>({ value: 'machine_learning' });
      const wrapper = mount(
        <TestProviders>
          <SelectRuleType
            describedByIds={[]}
            field={field}
            isUpdateView={false}
            hasValidLicense={false}
            isMlAdmin={true}
          />
        </TestProviders>
      );
      expect(
        wrapper.find('[data-test-subj="machineLearningRuleType"]').first().prop('isDisabled')
      ).toEqual(false);
    });

    it('renders machine learning as disabled if "isMlAdmin" is false and it is not selected', () => {
      const field = useFormFieldMock<unknown>({ value: 'query' });
      const wrapper = mount(
        <TestProviders>
          <SelectRuleType
            describedByIds={[]}
            field={field}
            isUpdateView={false}
            hasValidLicense={true}
            isMlAdmin={false}
          />
        </TestProviders>
      );
      expect(
        wrapper.find('[data-test-subj="machineLearningRuleType"]').first().prop('isDisabled')
      ).toEqual(true);
    });

    it('renders machine learning as not disabled if "isMlAdmin" is false and it is selected', () => {
      const field = useFormFieldMock<unknown>({ value: 'machine_learning' });
      const wrapper = mount(
        <TestProviders>
          <SelectRuleType
            describedByIds={[]}
            field={field}
            isUpdateView={false}
            hasValidLicense={true}
            isMlAdmin={false}
          />
        </TestProviders>
      );
      expect(
        wrapper.find('[data-test-subj="machineLearningRuleType"]').first().prop('isDisabled')
      ).toEqual(false);
    });
  });
});
