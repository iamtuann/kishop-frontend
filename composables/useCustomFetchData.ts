import { ref, onMounted, Ref } from "vue";
import { useAuthStore } from "~/stores";

type functionArgument = {
  (): Promise<any> | any
}

export interface FetchData<Data> {
  data: Ref<Data | null>,
  pending: Ref<boolean>,
  error: Ref<any>
}

export async function useCustomFetchData<Data = any>(apiSS: functionArgument, apiCS: functionArgument): Promise<FetchData<Data>> {
  const data: Ref<Data | null> = ref(null);
  const pending = ref(true);
  const error = ref<Error | null>(null);
  const { isAuthenticated } = useAuthStore();

  const fetchData = async () => {
    pending.value = true;
    try {
      if (isAuthenticated) {
        data.value = await apiSS();
        pending.value = false;
      } else if (process.client && !isAuthenticated) {
        if (apiCS instanceof Promise) {
          data.value = await apiCS();
        } else {
          data.value = apiCS();
        }
        pending.value = false;
      }
    } catch (err) {
      error.value = err as Error;
    }
  };

  if (process.client && !isAuthenticated) {
    onMounted(() => {
      fetchData();
    });
  } else {
    fetchData();
  }

  return {
    data,
    pending,
    error,
  };
}