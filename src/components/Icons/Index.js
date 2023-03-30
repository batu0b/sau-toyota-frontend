import React from "react";

export const Ico = ({
  hasGradient,
  className,
  stops,
  children,
  rotateGradient,
  ...props
}) => {
  const gradientId = `gradient-${Math.random().toString(36).substr(2, 9)}`;
  return (
    <svg
      className={`w-6 h-6 ${className}`}
      viewBox="0 0 512 512"
      height="1em"
      width="1em"
      stroke=""
      {...props}
      fill={hasGradient ? `url(#${gradientId})` : `currentColor`}
    >
      {hasGradient && (
        <defs>
          <linearGradient
            id={gradientId}
            x1="0%"
            y1="0%"
            x2="100%"
            y2="0%"
            gradientTransform={`rotate(${
              typeof rotateGradient !== `undefined` ? rotateGradient : 25
            })`}
          >
            {stops ? (
              <>
                {stops.map((stop, index) => (
                  <stop
                    key={index}
                    offset={
                      stop?.offset
                        ? `${stop.offset}%`
                        : index === 0
                        ? `0%`
                        : index === stops.length
                        ? `100%`
                        : `${index * (100 / (stops.length - 1))}%`
                    }
                    style={{
                      stopColor: stop.color,
                      stopOpacity: stop?.opacity ? stop.opacity : 1,
                    }}
                  />
                ))}
              </>
            ) : (
              <>
                <stop
                  offset={`0%`}
                  style={{
                    stopColor: `#005590`,
                    stopOpacity: 1,
                  }}
                />
                <stop
                  offset={`50%`}
                  style={{
                    stopColor: `#007b91`,
                    stopOpacity: 1,
                  }}
                />
                <stop
                  offset={`100%`}
                  style={{
                    stopColor: `#56a730`,
                    stopOpacity: 1,
                  }}
                />
              </>
            )}
          </linearGradient>
        </defs>
      )}
      {children}
    </svg>
  );
};

export const SaveIco = ({ className, ...props }) => {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke="currentColor"
      className={`w-6 h-6 ${className}`}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V21L12 17.25 4.5 21V5.507c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0111.186 0z"
      />
    </svg>
  );
};

export const DeleteIco = ({ className, ...props }) => {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke="currentColor"
      className={`w-6 h-6 ${className}`}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
      />
    </svg>
  );
};
export const PencilIco = ({ className, ...props }) => {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke="currentColor"
      className={`w-6 h-6 ${className}`}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L6.832 19.82a4.5 4.5 0 01-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 011.13-1.897L16.863 4.487zm0 0L19.5 7.125"
      />
    </svg>
  );
};

export const TriangleIco = (props) => {
  return (
    <Ico {...props}>
      <path d="M464 464H48a16 16 0 01-14.07-23.62l208-384a16 16 0 0128.14 0l208 384A16 16 0 01464 464z" />
    </Ico>
  );
};
