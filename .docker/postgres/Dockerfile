FROM postgres:13

ENV POSTGRES_DB=scheduledb
ENV POSTGRES_USER=root
ENV POSTGRES_PASSWORD=root

COPY migrations/* /docker-entrypoint-initdb.d/

EXPOSE 5432
