import type { OperationVariables } from '@apollo/client/core/index.js'
import type { DocumentNode } from 'graphql'
import { isRef } from 'vue'
import type { DocumentParameter, OptionsParameter, UseQueryOptions, VariablesParameter } from './useQuery'
import { useQueryImpl } from './useQuery'

export function useLazyQuery<
  TResult = any,
  TVariables = OperationVariables,
>(
  document: DocumentParameter<TResult, TVariables>,
  variables?: VariablesParameter<TVariables>,
  options?: OptionsParameter<TResult, TVariables>,
) {
  const query = useQueryImpl<TResult, TVariables>(document, variables, options, true)

  function load(
    document?: DocumentNode,
    variables?: TVariables,
    options?: UseQueryOptions,
  ) {
    if (document)
      query.document.value = document

    if (variables)
      query.variables.value = variables

    if (options)
      Object.assign(isRef(query.options) ? query.options.value : query.options, options)

    query.forceDisabled.value = false
  }

  return {
    ...query,
    load,
  }
}
