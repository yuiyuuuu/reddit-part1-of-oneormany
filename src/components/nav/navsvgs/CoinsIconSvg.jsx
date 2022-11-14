import React from "react";

const CoinsIconSvg = () => {
  return (
    <svg
      width='20'
      height='20'
      viewBox='0 0 42 42'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
      xmlnsXlink='http://www.w3.org/1999/xlink'
      className='icon'
    >
      <rect width='42' height='42' fill='url(#pattern0111)' />
      <defs>
        <pattern
          id='pattern0111'
          patternContentUnits='objectBoundingBox'
          width='1'
          height='1'
        >
          <use
            xlinkHref='#image0_78_11'
            transform='translate(0 -0.025) scale(0.025)'
          />
        </pattern>
        <image
          id='image0_78_11'
          width='40'
          height='42'
          xlinkHref='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACgAAAAqCAYAAADBNhlmAAAIPklEQVRYhe1YfVBU1xX/3RWKih91YNWUs1RbQCuS8EAbCamKpuNCImisLHWGTbQRrVK1CZmMYowlONNqMpUlSYVEJE4djB+BaVqIVpcZBTpGQAmsraEG2CWiLKAgGj7U0z/2vf3ABWRpZzqd/mbe7L33d865v7333XvPu8B/OYSnjswsnPxVTr9KmQE8EELc91yeBwI7r10KLrv4xSKLxSxVXapf2QUxBYA3gDHOwgDcAeh66MJZx4ICI8vWxEUa/6MCzx/aqf3wYP4BYyO+70lHADqam5v9Ruo0rMDG4gzpjfTc8nIrxjla1Qh6JuTiNG/0g+GDm/Uh5VdbJz7iPCMSkahCVSM6AXQB0AC42Nzc/OORCnWL4jcTdhERE9FDoijWbz/07vmm21Pc2TKz11fG/OfTk6PqZR8mSuD005aV3F4/qebUH+amPiet0mg0K4iINVLSvFGJO7pVOiB31CatNRyvsPC44b1ssFa894JeUkRKvLmwKdmZjw0K8iGi4xqN9LFH4gq3ReyXg5uT3qva7EkMvlv5hCFRuqqITC0y6wbaENElIunzEQWuzEpIk4M26XNr13kizi6SK8fnvixdUKY75wo/4UYkBwTEv/NYAXu/zJ6dYJvWnhVZVSmjEWcX2WqaYIinb4iIKd7QOZDfNEc9gYiYEgy7hg7Eld458VQvG59iZtWQDiNA36X98xOIOoiIk4+Y3x7Ia4lqiIj1R8w8aL+3T6evluT3JbOsb9AV1nntdHDB22m7dUslMxExSTGs25h+5pDREsfM3u58mFmU7QnfbrNP7z/TzlHO/Lk9kREyx2fbmd0EsE4sSCZbh78sPOm+kxu+JRmJJZJ9C3HzxO/tqOzgyW79rx0N0RNVEBHrj5qznUeKS0u99HIM/SdmZuYJCmczMp1c/HEpNACQonv+t4+KaxhbtC22aX1uhdbqrncFvZMfek+B+7P3B7r6DRvEhwBgPFSSVAuEKJSIibmflGgrG/NKUAe0uAi01JSuqwMA9Zb+2Yu8q13Fsaoqa9ulX520uhxT6lnRpuiF0SXRCyPPaOS2sBVRB58S4q47fUIInr94fTWAb2Eq9K8wweU0WbJiw6sAAJMRdY2wjyCY630KN8pTlHk+d2BgrjuwU+s8jZL+lqGizSU4c8PYs/tS0g/W8VPuxNntui74ZQQEHCIi1h0xf+TKnflJutzH+hNmdiJK/TNk4pWTll+4dsxjzu5wFpfKn97gqUOJGFIgV3oXvqJ5jYiYdhi/vsHs68wXrqdO20CVcQ/zVgBQ4VbLNJNsEDaDvnGJ2GV8x3jYUV2S9sbuF6eLVk8FCjGvPzCUGwAAVfUTOgGX41MTinwAwBULWoF1NoGt7epyAEAsNNMcLycAoNGUUmyvJCFJS7/3VJwCmhFXAwAw9Y6/BfQ5c4Ez42zv/zkrWoEnbQJxz7F3qeCSMlkbasfbV+3CyO44P9E1WoFjvFQ9ttJXPm2d9iTXBn4oL7Db6OmVJVmvX5tl5wXc7mEAgMljh9xhHhf8sE/+k71eKivuuZJC3hstsHbIAidOphqFHyPQ5mIPmO2Vr1s9XhzOUCfk3bGVfBAXLHpd+xPyVhYMjZxWqMb6TnQsjAeuQz51ZphFrVRMlb7HWliNfxtC+h9pEjzdVhhrb1KhO9wcDQAoQVMLgl0cnpy+KM5eKcGfSy2rRyur2hA4BwAQ6tM3kGtuKFkEANBqMBW4CQAqERNzP1Q2MDVYwp0dhEh8EJuq7lDqxn37fjNagc218ndQZJBvJ/N8pZ25eYHZBJvAGWqogVxAPurCtDaj4qvmnw4MGL1q7fcilYq10J8kfc37ptYJA+3Ks19ftXuYFI37ysMvlzzcBwDRocGYBEy3k72Nn9TKuXXs3BCME8KRH9bmLttqy2wzGtwFrtofv35A5nJdWqr7XLdGl5f08xX5UQEBV4ioW/uBKX4ogT3lv3tXImon0j7IqXNNq3rOZcixdVzQ4Cbl0hI1EtGtwYIXbo14f9A0S340y3KOyTcOj4D53tNlmdRKREzLcvprmfscXJdf8atynDUFbGa+oHD2KUmOERsAfFeTfPRP7jpYmVW9uWDbs3o1cHuQ/3Cfu2unHb8Bf7dsy6m/HT6AOwCwZF3srbmA49xv/Evb0WO24pKEaAQK8bTbGHJGfWcQAXYUvP3azxKXSseJ6J9EUdXxG3e8lfvphZDB7Jm7/MoyJTnhSL9ztt159NjXwWVwWbeb6VWQuzwgmYg4YHl25nAiR4Jvqwx7EpSM+Yi5jZk3KVzPF3tZ6+CYmV8fMpjycYNB3qWRgu9dDjDEK58EOVzLjhFiSyGnKh/48Qau7Rli9BRcyF4+U/4uHuxdGxFy1srTR3ouaOAHdnHdlU124ZTAhpqe4cUpKPq19JwssnXNB1+6vYt5HBhWSzW2OFGc9pm5g5kXAwC3l9XttYuTOLXIzMw8skuC3JfDN8nbx73wtVkvjVScXqK79ruZInMDM1cwXx9fX5Rh0jnd26SeMDMz5480PgCgZGf8i0TULY/CxZe25w+5EQNAun5Bnsvt1l/NF3u6LVm1Jfnn0xIlx74p6XjvuU5m5reGijfsQrB8lhmQtuvAiXIrFshNVwB1V9Azs85MG8NdrGKhulk/s+wf1gQArncvjvtBF2heeBP7MlIQrcYWIUT2qAQqOJe3I+KjvMOZxkaEAfCHc070mNDEpGDLto1IilBfFULMfhwfj7aS4j8aJjVdbwmrvtzwbBezFwCwYC8B4Q/ghwB+xODxAoEdcxYG7Q6ZMa87Yl7YtRC/7wghxN896fP/+J/FvwBkktHoNxzSLwAAAABJRU5ErkJggg=='
        />
      </defs>
    </svg>
  );
};

export default CoinsIconSvg;
