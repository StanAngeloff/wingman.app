TOP := $(shell readlink -f `pwd`)
PLATFORM := linux

CERTS_PATH   := application/config/certs/

MONGOOSE_VERSION      := 3.0
MONGOOSE_DOWNLOAD     := http://mongoose.googlecode.com/files/mongoose-$(MONGOOSE_VERSION).tgz
MONGOOSE_BINARY       := mongoose
MONGOOSE_OPTIONS      := -D'CONFIG_FILE=\"application/config/$(MONGOOSE_BINARY).config\"'
MONGOOSE_CERT_SUBJECT := /C=GB/ST=Oxfordshire/L=Oxford/O=Fake Company Ltd./OU=IT/CN=localhost

.PHONY: default all issue-local-certificate compile-local-server start-local-server

default:
	@echo "No default $(MAKE) target configured."
	@exit 1

all: issue-local-certificate compile-local-server start-local-server

$(CERTS_PATH)$(MONGOOSE_BINARY).pem:
	@mkdir -p "$(CERTS_PATH)"
	@openssl req -x509 -nodes -days 3650 -subj "$(MONGOOSE_CERT_SUBJECT)" -newkey rsa:1024 -keyout "$(CERTS_PATH)$(MONGOOSE_BINARY).pem" -out "$(CERTS_PATH)$(MONGOOSE_BINARY).pem"
	@echo 'Certificate for local development server issued successfully.'

issue-local-certificate: $(CERTS_PATH)$(MONGOOSE_BINARY).pem

compile-local-server: issue-local-certificate $(MONGOOSE_BINARY)

$(MONGOOSE_BINARY):
	$(eval MONGOOSE_PATH := $(shell mktemp -d -t mongoose.XXXXXX))
	$(eval MONGOOSE_TMP  := $(MONGOOSE_PATH)/$(shell basename $(MONGOOSE_DOWNLOAD)))
	@curl -so "$(MONGOOSE_TMP)" "$(MONGOOSE_DOWNLOAD)"
	@tar zxf "$(MONGOOSE_TMP)" -C "$(MONGOOSE_PATH)"
	@( cd "$(MONGOOSE_PATH)/mongoose" && $(MAKE) $(PLATFORM) COPT=$(MONGOOSE_OPTIONS) && cp './$(MONGOOSE_BINARY)' "$(TOP)" )
	@echo 'Local development server compiled successfully.'

start-local-server: compile-local-server
	@$(TOP)/$(MONGOOSE_BINARY)
